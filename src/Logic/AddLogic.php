<?php

namespace Nodeloc\VPS\Logic;

use Flarum\Foundation\ValidationException;
use Nodeloc\VPS\Model\CurrencyRate;
use Nodeloc\VPS\Model\VPS;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Str;
use Flarum\Foundation\AbstractValidator;
use Intervention\Image\Exception\NotReadableException;
use Symfony\Component\Mime\MimeTypes;
use Symfony\Contracts\Translation\TranslatorInterface;
use Laminas\Diactoros\StreamFactory;

class AddLogic
{

    protected $laravelValidator;

    function getCurrencyRate($currencyCode) {
        // 从数据库中查询汇率
        $currencyRate = CurrencyRate::where('currency', $currencyCode)->first();

        // 如果找到汇率，返回它，否则返回0
        if ($currencyRate) {
            return $currencyRate->rate;
        } else {
            return 0;
        }
    }


    public function save($actor, $data)
    {
        $msg = ["status" => false, "msg" => ""];

        $vps = new VPS();
        $vps->user_id = $actor->id;
        $vps->merchant_id = isset($data["merchant_id"]) ? $data["merchant_id"] : null;
        $vps->location_id = isset($data["location_id"]) ? $data["location_id"] : null;
        $vps->product_name = isset($data["product_name"]) ? $data["product_name"] : null;
        $vps->product_type = isset($data["product_type"]) ? $data["product_type"] : 0;
        $vps->cpu = isset($data["cpu"]) ? $data["cpu"] : null;
        $vps->memory = isset($data["memory"]) ? $data["memory"] : null;
        $vps->storage = isset($data["storage"]) ? $data["storage"] : null;
        $vps->disk_type = isset($data["disk_type"]) ? $data["disk_type"] : null;
        $vps->bandwidth = isset($data["bandwidth"]) ? $data["bandwidth"] : null;
        $vps->gig = isset($data["GIG"]) ? $data["GIG"] : null;
        $vps->cost = isset($data["cost"]) ? $data["cost"] : null;
        $vps->currency = isset($data["currency"]) ? $data["currency"] : null;
        $vps->score = isset($data["score"]) ? $data["score"] : null;
        $vps->payment_cycle = isset($data["payment_cycle"]) ? $data["payment_cycle"] : null;
        $vps->monitor_url = isset($data["monitor_url"]) ? $data["monitor_url"] : null;
        $vps->monitor_rule = isset($data["monitor_rule"]) ? $data["monitor_rule"] : null;
        $vps->review_url  = isset($data["review_url"]) ? $data["review_url"] : null;
        $vps->buy_url = isset($data["buy_url"]) ? $data["buy_url"] : null;
        $vps->status = 1;

        if (isset($vps->payment_cycle, $vps->cost, $vps->currency)) {
            // 定义支付周期与月数的映射关系
            $cycleMap = [1, 3, 6, 12, 24, 36, 60];
            // 获取实际的支付周期月数
            $months = $cycleMap[$vps->payment_cycle];
            // 计算一年的成本
            $annualCost = ($vps->cost / $months) * 12;
            $currencyMap = ["USD", "CNY", "HKD", "EUR", "GBP", "JPY"];
            $currency_rate = $this->getCurrencyRate($currencyMap[$vps->currency]);
            if($currency_rate>0){
                $vps->price = $annualCost / $currency_rate;
            }else{
                $vps->price = 0;
            }
        }
        $status = VPS::where([
            "product_name" => $vps->product_name,
            "merchant_id" => $vps->merchant_id
        ])->first();

        if ($status) {
            throw new ValidationException(['msg' => "产品已存在"]);
        }

        $vps->save();
        // 保存标签数据
        if (isset($data['tags'])) {
            $vps->tags()->sync($data['tags']);
        }
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
