<?php

namespace Nodeloc\VPS\Model;

use Flarum\Database\AbstractModel;

class Location extends AbstractModel
{
    protected $table = 'vps_location';

    // 添加必要的字段
    protected $fillable = ['location_name', 'location_intro'];
}
