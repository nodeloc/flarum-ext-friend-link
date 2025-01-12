<?php

namespace Nodeloc\FriendLink\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\User\User;
use Nodeloc\FriendLink\Model\FriendLinkAction;

class GetListSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'friendLinkList';

    protected $actor;

    /**
     * {@inheritdoc}
     */
    protected function getDefaultAttributes($friendlink)
    {
        // $user = User::select('username')->where("id", $friendlink->user_id)->first();
        $status = FriendLinkAction::where([
            "friend_link_id" =>$friendlink->id,
            "user_id" => $this->actor->id,
            "type" => 0
        ])->first();
        return [
            'id' => $friendlink->id,
            'uid' => $friendlink->user_id,
            'img_list' => explode(",",$friendlink->img_list),
            'cover_width' => $friendlink->cover_width,
            'cover_height' => $friendlink->cover_height,
            'created_time' => $friendlink->created_time,
            'like_count' => $friendlink->like_count,
            'view_count' => $friendlink->view_count,
            'exchange_count' => $friendlink->exchange_count,
            'is_my_like' => $status ? true : false,
            'status' => $friendlink->status,
            'sitename' => $friendlink->sitename,
            'siteurl' => $friendlink->siteurl,
            'sitelogourl' => $friendlink->sitelogourl
        ];
    }

    /**
     * @param $username_request
     *
     * @return \Tobscure\JsonApi\Relationship
     */
    protected function user($user)
    {
        return $this->hasOne($user, UserSerializer::class);
    }
}
