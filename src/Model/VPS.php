<?php

namespace  Nodeloc\VPS\Model;

use Flarum\Database\AbstractModel;
use Flarum\User\User;


class VPS extends AbstractModel
{
    protected $table = 'vps';
    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function merchant()
    {
        return $this->belongsTo(Merchant::class, 'merchant_id'); // 明确指定外键
    }

    public function location()
    {
        return $this->belongsTo(Location::class, 'location_id'); // 明确指定外键
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'vps_tag_relation', 'vps_id', 'tag_id');
    }
}
