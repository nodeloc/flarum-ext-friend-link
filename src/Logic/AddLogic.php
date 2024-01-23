<?php

namespace Nodeloc\FriendLink\Logic;

use Flarum\Foundation\ValidationException;
use Nodeloc\FriendLink\Model\FriendLink;

class AddLogic
{
    public function save($actor, $data)
    {
        $msg = ["status" => false, "msg" => ""];
        $sitelogo = isset($_FILES['sitelogo']) ? $_FILES['sitelogo'] : null;
        $siteName = isset($data["sitename"]) ? $data["sitename"] : null;
        $siteUrl = isset($data["siteurl"]) ? $data["siteurl"] : null;

        if (!$sitelogo) {
            throw new ValidationException(['msg' => "请选择图片"]);
        }

        $status = FriendLink::where([
            "user_id" => $actor->id,
            "siteurl" => $siteUrl,
            "status" => 1,
        ])->first();

        if ($status) {
            throw new ValidationException(['msg' => "您已分享过此内容"]);
        }
        // 处理文件上传
        // 处理文件上传
        try {
            $uploadedSitelogo = $this->moveUploadedFile($sitelogo, 'assets/avatars', 'public');
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
    private function moveUploadedFile($file, $directory, $disk)
    {
        $targetPath = public_path("{$directory}/");
        $fileName = time() . '_' . $file['name'];

        if (!move_uploaded_file($file['tmp_name'], $targetPath . $fileName)) {
            throw new \Exception("文件上传失败");
        }

        return "{$directory}/{$fileName}";
    }
}
