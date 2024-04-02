<?php

namespace Nodeloc\FriendLink\Logic;

use Flarum\Foundation\ValidationException;
use Nodeloc\FriendLink\Model\FriendLink;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Str;
use Intervention\Image\Image;
use Intervention\Image\ImageManagerStatic as ImageManagerStatic;
use Flarum\Foundation\AbstractValidator;
use Intervention\Image\Exception\NotReadableException;
use Intervention\Image\ImageManager;
use Psr\Http\Message\UploadedFileInterface;
use Symfony\Component\Mime\MimeTypes;
use Symfony\Contracts\Translation\TranslatorInterface;
use Laminas\Diactoros\StreamFactory;

class AddLogic
{

    protected $uploadDir;
    protected $laravelValidator;

    /**
     * @var ImageManager
     */
    protected $imageManager;
    public function __construct(Factory $filesystemFactory, ImageManager $imageManager)
    {
        $this->imageManager = $imageManager;
        $this->uploadDir = $filesystemFactory->disk('flarum-avatars');
    }
    public function save($actor, $data,$file)
    {
        $msg = ["status" => false, "msg" => ""];

        $siteName = isset($data["sitename"]) ? $data["sitename"] : null;
        $siteUrl = isset($data["siteurl"]) ? $data["siteurl"] : null;
        if (!$this->validateInput($siteName) || !$this->validateInput($siteUrl)) {
            throw new ValidationException(['msg' => "输入内容不合法"]);
        }

        if (!$file) {
            throw new ValidationException(['msg' => "请选择图片"]);
        }
        $this->assertFileRequired($file);
        $this->assertFileMimes($file);
        $this->assertFileSize($file);
        // 使用 ImageManager 创建 Image 实例

        $status = FriendLink::where([
            "user_id" => $actor->id,
            "siteurl" => $siteUrl,
            "status" => 1,
        ])->first();

        if ($status) {
            throw new ValidationException(['msg' => "您已分享过此内容"]);
        }
        // 处理文件上传
        try {
            $uploadedSitelogo = $this->upload($file);
        } catch (\Exception $e) {
            throw new ValidationException(['msg' => $e->getMessage()]);
        }

        FriendLink::insert([
            "user_id" => $actor->id,
            "status" => 2,
            "created_time" => time(),
            "sitename" => $siteName,
            "siteurl" => $siteUrl,
            "sitelogourl" => $uploadedSitelogo, // 将上传后的文件路径保存到数据库
        ]);

        $msg["status"] = true;
        return $msg;
    }

    function validateInput($input) {
        // 使用正则表达式匹配输入，只允许中文、英文和数字
        if (preg_match('/^[a-zA-Z0-9\x{4e00}-\x{9fa5}:\/.]+$/u', $input)) {
            return true; // 输入合法
        } else {
            return false; // 输入包含非法字符
        }
    }
    /**
     * @param Image $image
     */
    public function upload(UploadedFileInterface $file)
    {
        // 创建StreamFactory实例
        $streamFactory = new StreamFactory();
        // 从上传文件创建流
        $stream = $streamFactory->createStreamFromFile($file->getStream()->getMetadata('uri'));
        // 使用Intervention Image处理图像
        $image = ImageManagerStatic ::make($stream)->fit(100, 100)->encode('png');
        $ext = pathinfo($file->getClientFilename(), PATHINFO_EXTENSION);
        $filename = Str::random().'.'.$ext;
        $stream->rewind();
        $this->uploadDir->put($filename, $image);
        return $this->uploadDir->url($filename);

    }
    protected function assertFileRequired(UploadedFileInterface $file)
    {
        $error = $file->getError();

        if ($error !== UPLOAD_ERR_OK) {
            if ($error === UPLOAD_ERR_INI_SIZE || $error === UPLOAD_ERR_FORM_SIZE) {
                throw new ValidationException(['msg' => 'file_too_large']);
            }

            if ($error === UPLOAD_ERR_NO_FILE) {
                throw new ValidationException(['msg' => '图片不能为空']);
            }
            throw new ValidationException(['msg' => 'file_upload_failed']);
        }
    }

    protected function assertFileMimes(UploadedFileInterface $file)
    {
        $allowedTypes = $this->getAllowedTypes();

        // Block PHP files masquerading as images
        $phpExtensions = ['php', 'php3', 'php4', 'php5', 'phtml'];
        $fileExtension = pathinfo($file->getClientFilename(), PATHINFO_EXTENSION);

        if (in_array(trim(strtolower($fileExtension)), $phpExtensions)) {
            throw new ValidationException(['msg' => '文件类型不允许']);
        }

        $guessedExtension = MimeTypes::getDefault()->getExtensions($file->getClientMediaType())[0] ?? null;

        if (! in_array($guessedExtension, $allowedTypes)) {
            throw new ValidationException(['msg' => '文件类型不允许']);
        }

        try {
            $this->imageManager->make($file->getStream()->getMetadata('uri'));
        } catch (NotReadableException $_e) {
            throw new ValidationException(['msg' => '文件不存在']);
        }
    }

    protected function assertFileSize(UploadedFileInterface $file)
    {
        $maxSize = $this->getMaxSize();

        if ($file->getSize() > $maxSize) {
            throw new ValidationException(['msg' => '文件大小'.$file->getSize().'超过'.$maxSize]);
        }
    }


    protected function getMaxSize()
    {
        return 24096;
    }

    protected function getAllowedTypes()
    {
        return ['jpeg', 'jpg', 'png', 'bmp', 'gif'];
    }
}
