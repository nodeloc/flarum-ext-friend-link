<?php
namespace Nodeloc\FriendLink\Logic;
use Flarum\Foundation\ValidationException;
use Nodeloc\FriendLink\Model\FriendLinkAction;
use Nodeloc\FriendLink\Model\FriendLink;
use Flarum\Notification\NotificationSyncer;
use Nodeloc\FriendLink\Notification\LikedNotification;
use Flarum\User\User;

class LikeLogic
{
    public function save($actor,$data)
    {
        $msg = ["status" => false , "msg" => ""];
        $showId = isset($data["show_id"]) ? $data["show_id"] : 0;
        if(!$showId){
            throw new ValidationException(['msg' => "您选择的内容有误"]);
        }
        $cardStatus = FriendLink::where([
            "id" => $showId
        ])->first();
        if(!$cardStatus){
            throw new ValidationException(['msg' => "您选择的内容有误"]);
        }
        if($cardStatus->user_id==$actor->id){
            throw new ValidationException(['msg' => "您不能点赞自己的内容"]);
        }

        $status = FriendLinkAction::where([
            "friend_link_id" => $showId,
            "user_id" => $actor->id,
            "type" => 0
        ])->first();

        if($status){
            throw new ValidationException(['msg' => "您已点赞过此内容"]);
        }

        FriendLinkAction::insert([
            "friend_link_id" => $showId,
            "user_id" => $actor -> id,
            "type" => 0,
            "created_time" => time()
        ]);

        FriendLink::where([
            "id" => $showId,
        ])->increment("like_count");

        $notification = resolve(NotificationSyncer::class);
        $user = User::findOrFail($cardStatus->user_id);

        $notification->sync(new LikedNotification($actor,$cardStatus),[$user]);

        $msg["status"] = true;
        return $msg;
    }
}
