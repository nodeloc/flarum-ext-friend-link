<?php
namespace Nodeloc\FriendLink\Logic;

use Nodeloc\FriendLink\Model\FriendLink;
use Nodeloc\FriendLink\Model\FriendLinkViews;

class ViewAddLogic
{
    public function save($actor,$data,$ip)
    {
        $msg = ["status" => false , "msg" => ""];
        $showId = isset($data["show_id"]) ? $data["show_id"] : 0;
        if(!$ip || !$showId){
            return $msg;
        }

        $uid = 0;
        if($actor->id){
            $uid = $actor->id;
        }
        $status = FriendLinkViews::where([
            "friend_link_id" => $showId,
            "ip" => $ip
        ])->first();
        if($status){
            return $msg;
        }

        FriendLinkViews::insert([
            "user_id" => $uid,
            "friend_link_id" => $showId,
            "ip" => $ip,
            "created_time" => time()
        ]);

        FriendLink::where([
            "id" => $showId,
        ])->increment("view_count");
        $msg["status"] = true;
        return $msg;
    }
}
