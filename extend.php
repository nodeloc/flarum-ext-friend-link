<?php

/*
 * This file is part of nodeloc/friend-link.
 *
 * Copyright (c) 2023 Emin.lin.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Nodeloc\FriendLink;

use Flarum\Extend;
use Nodeloc\FriendLink\Filter\GetListFilter;
use Nodeloc\FriendLink\Model\FriendLink;
use Nodeloc\FriendLink\Notification\LikedNotification;
use Nodeloc\FriendLink\Query\GetListQuery;
use Nodeloc\FriendLink\Serializer\GetListSerializer;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less')
        ->route('/friendlink', 'friendlink', Controllers\IndexController::class),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Filter(GetListFilter::class))
        ->addFilter(GetListQuery::class),

    //数据关联用户
    (new Extend\Model(User::class))
        ->relationship('friendLinkList', function ($user) {
            return $user->hasOne(FriendLink::class, 'uid');
    }),

    (new Extend\Routes('api'))
        ->get('/friend_link_list', 'FriendLink.list', Controllers\GetListController::class)
        ->post('/nodeloc/friend_link/add', 'FriendLink.create', Controllers\AddController::class)
        ->post('/nodeloc/friend_link/hide', 'FriendLink.hide', Controllers\HideController::class)
        ->post('/nodeloc/friend_link/like', 'FriendLink.like', Controllers\LikeController::class)
        ->post('/nodeloc/friend_link/view', 'FriendLink.view', Controllers\ViewAddController::class),

    (new Extend\Notification())
        ->type(LikedNotification::class, GetListSerializer::class, ['alert']),
];
