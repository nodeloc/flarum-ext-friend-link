<?php
namespace Nodeloc\VPS\Logic;

use Nodeloc\VPS\Model\VPS;
use Nodeloc\VPS\Model\VPSViews;

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
        $status = VPSViews::where([
            "vps_id" => $showId,
            "ip" => $ip
        ])->first();
        if($status){
            return $msg;
        }

        VPSViews::insert([
            "user_id" => $uid,
            "vps_id" => $showId,
            "ip" => $ip,
            "created_time" => time()
        ]);

        VPS::where([
            "id" => $showId,
        ])->increment("view_count");
        $msg["status"] = true;
        return $msg;
    }
}
