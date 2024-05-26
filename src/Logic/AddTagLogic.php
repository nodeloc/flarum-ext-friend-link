<?php

namespace Nodeloc\VPS\Logic;

use Flarum\Foundation\ValidationException;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Str;
use Flarum\Foundation\AbstractValidator;
use Intervention\Image\Exception\NotReadableException;
use Nodeloc\VPS\Model\Tag;
use Symfony\Component\Mime\MimeTypes;
use Symfony\Contracts\Translation\TranslatorInterface;
use Laminas\Diactoros\StreamFactory;

class AddTagLogic
{

    protected $laravelValidator;

    public function save($actor, $data)
    {
        $msg = ["status" => false, "msg" => ""];

        $tag = new Tag();
        $tag->tag_name = isset($data["tag_name"]) ? $data["tag_name"] : null;
        $tag->tag_intro = isset($data["tag_intro"]) ? $data["tag_intro"] : 0;

        if (!$this->validateInput($tag->tag_name) || !$this->validateInput($tag->tag_name)) {
            throw new ValidationException(['msg' => "输入内容不合法"]);
        }

        $status = Tag::where([
            "tag_name" => $tag->tag_name,
        ])->first();

        if ($status) {
            throw new ValidationException(['msg' => "标签已存在"]);
        }

        $tag->save();
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
}
