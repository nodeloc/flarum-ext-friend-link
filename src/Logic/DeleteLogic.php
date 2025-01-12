<?php

namespace Nodeloc\FriendLink\Logic;

use Flarum\Foundation\ValidationException;
use Nodeloc\FriendLink\Model\FriendLink;

class DeleteLogic
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

        // 检查用户是否为管理员或内容的创建者
        $isAdmin = $actor->isAdmin();

        if ($cardStatus->user_id != $actor->id && !$isAdmin) {
            throw new ValidationException(['msg' => "您只能删除自己的内容"]);
        }

        // 删除记录
        FriendLink::where([
            "id" => $showId,
        ])->delete();

        $msg["status"] = true;
        $msg["msg"] = "内容已成功删除";
        return $msg;
    }
}
