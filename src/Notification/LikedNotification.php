<?php

namespace  Nodeloc\FriendLink\Notification;

use Flarum\Notification\Blueprint\BlueprintInterface;
use Nodeloc\FriendLink\Model\FriendLink;

class LikedNotification implements BlueprintInterface
{
    public $show;

    public $actor;

    public function __construct($actor, FriendLink $show)
    {
        $this->actor=$actor;
        $this->show=$show;
    }

    public function getFromUser()
    {
        return $this->actor;
    }

    public function getSubject()
    {
        return $this->show;
    }

    public function getData()
    {
        return null;
    }

    public static function getType()
    {
        return 'friendLinkLiked';
    }

    public static function getSubjectModel()
    {
        return FriendLink::class;
    }
}
