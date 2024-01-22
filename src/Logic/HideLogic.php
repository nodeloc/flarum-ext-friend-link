<?php

namespace Nodeloc\FriendLink\Logic;

use Flarum\Foundation\ValidationException;
use Nodeloc\FriendLink\Model\FriendLink;

class HideLogic
{
    public function save($actor, $data)
    {
        $msg = ["status" => false, "msg" => ""];
        $showId = isset($data["show_id"]) ? $data["show_id"] : 0;

        if (!$showId) {
            return $msg;
        }

        $cardStatus = FriendLink::where([
            "id" => $showId
        ])->first();

        if (!$cardStatus) {
            throw new ValidationException(['msg' => "您选择的内容有误"]);
        }

        // Check if the user is an administrator
        $isAdmin = $actor->isAdmin();

        if ($cardStatus->user_id != $actor->id && !$isAdmin) {
            throw new ValidationException(['msg' => "您只能删除自己的内容"]);
        }

        FriendLink::where([
            "id" => $showId,
        ])->update([
            "status" => 0,
            "update_time" => time()
        ]);

        $msg["status"] = true;
        return $msg;
    }
}
