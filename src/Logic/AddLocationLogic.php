<?php

namespace Nodeloc\VPS\Logic;

use Flarum\Foundation\ValidationException;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Str;
use Flarum\Foundation\AbstractValidator;
use Intervention\Image\Exception\NotReadableException;
use Nodeloc\VPS\Model\Location;
use Symfony\Component\Mime\MimeTypes;
use Symfony\Contracts\Translation\TranslatorInterface;
use Laminas\Diactoros\StreamFactory;

class AddLocationLogic
{

    protected $laravelValidator;

    public function save($actor, $data)
    {
        $msg = ["status" => false, "msg" => ""];

        $location = new Location();
        $location->location_name = isset($data["location_name"]) ? $data["location_name"] : null;
        $location->location_intro = isset($data["location_intro"]) ? $data["location_intro"] : 0;

        if (!$this->validateInput($location->location_name) || !$this->validateInput($location->location_name)) {
            throw new ValidationException(['msg' => "输入地区不合法"]);
        }

        $status = Location::where([
            "location_name" => $location->location_name,
        ])->first();

        if ($status) {
            throw new ValidationException(['msg' => "地区已存在"]);
        }

        $location->save();
        $msg["status"] = true;
        return $msg;
    }

    function validateInput($input) {
        // 使用正则表达式匹配输入，只允许中文、英文和数字
        if (preg_match('/^[a-zA-Z0-9\x{4e00}-\x{9fa5}:\/.()]+$/u', $input)) {
            return true; // 输入合法
        } else {
            return false; // 输入包含非法字符
        }
    }
}
