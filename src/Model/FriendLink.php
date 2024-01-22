<?php

namespace  Nodeloc\FriendLink\Model;

use Flarum\Database\AbstractModel;
use Flarum\User\User;


class FriendLink extends AbstractModel
{
    protected $table = 'friend_link';

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
