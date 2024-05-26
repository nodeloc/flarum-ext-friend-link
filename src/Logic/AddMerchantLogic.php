<?php

namespace Nodeloc\VPS\Logic;

use Flarum\Foundation\ValidationException;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Str;
use Flarum\Foundation\AbstractValidator;
use Intervention\Image\Exception\NotReadableException;
use Nodeloc\VPS\Model\Merchant;
use Symfony\Component\Mime\MimeTypes;
use Symfony\Contracts\Translation\TranslatorInterface;
use Laminas\Diactoros\StreamFactory;

class AddMerchantLogic
{

    protected $laravelValidator;

    public function save($actor, $data)
    {
        $msg = ["status" => false, "msg" => ""];

        $merchant = new Merchant();
        $merchant->merchant_name = isset($data["merchant_name"]) ? $data["merchant_name"] : null;
        $merchant->merchant_intro = isset($data["merchant_intro"]) ? $data["merchant_intro"] : null;
        $merchant->merchant_url= isset($data["merchant_url"]) ? $data["merchant_url"] : null;
        $merchant->merchant_link = isset($data["merchant_link"]) ? $data["merchant_link"] : null;
        $merchant->merchant_homepage = isset($data["merchant_homepage"]) ? $data["merchant_homepage"] : null;
        $merchant->merchant_type = isset($data["merchant_type"]) ? $data["merchant_type"] : 0;

        if (!$this->validateInput($merchant->merchant_name) || !$this->validateInput($merchant->merchant_name)) {
            throw new ValidationException(['msg' => "输入内容不合法"]);
        }

        $status = Merchant::where([
            "merchant_name" => $merchant->merchant_name,
        ])->first();

        if ($status) {
            throw new ValidationException(['msg' => "商家已存在"]);
        }

        $merchant->save();
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
