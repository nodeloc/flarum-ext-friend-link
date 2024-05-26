<?php

namespace Nodeloc\VPS\Model;

use Flarum\Database\AbstractModel;

class Merchant extends AbstractModel
{
    protected $table = 'vps_merchant';

    // 添加必要的字段
    protected $fillable = ['merchant_name', 'merchant_intro','merchant_type','merchant_url','merchant_link','merchant_homepage'];
}
