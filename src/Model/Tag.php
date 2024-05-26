<?php

namespace Nodeloc\VPS\Model;

use Flarum\Database\AbstractModel;

class Tag extends AbstractModel
{
    protected $table = 'vps_tag';

    protected $fillable = ['tag_name','tag_intro'];
    protected $primaryKey = 'id';
    // 定义多对多关系
    public function vps()
    {
        return $this->belongsToMany(VPS::class, 'vps_tag_relation', 'tag_id', 'vps_id');
    }
}
