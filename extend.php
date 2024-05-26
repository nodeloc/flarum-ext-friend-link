<?php

/*
 * This file is part of nodeloc/vps.
 *
 * Copyright (c) 2023 Emin.lin.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Nodeloc\VPS;

use Flarum\Extend;
use Flarum\Api\Serializer\ForumSerializer;
use Nodeloc\VPS\Controllers\ListLocationsController;
use Nodeloc\VPS\Controllers\ListMerchantsController;
use Nodeloc\VPS\Controllers\ListVpsTagsController;
use Nodeloc\VPS\Filter\GetListFilter;
use Nodeloc\VPS\Model\VPS;
use Nodeloc\VPS\Policy\UserPolicy;
use Nodeloc\VPS\Query\GetListQuery;
use Illuminate\Console\Scheduling\Event;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less')
        ->route('/vps', 'vps', Controllers\IndexController::class),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Filter(GetListFilter::class))
        ->addFilter(GetListQuery::class),

    //数据关联用户
    (new Extend\Model(User::class))
        ->relationship('vpsList', function ($user) {
            return $user->hasOne(VPS::class, 'uid');
    }),
    (new Extend\Policy())->modelPolicy(User::class, UserPolicy::class),
    (new Extend\Routes('api'))
        ->get('/vps_list', 'VPS.list', Controllers\GetListController::class)
        ->post('/nodeloc/vps/add', 'VPS.create', Controllers\AddController::class)
        ->post('/nodeloc/merchant/add', 'merchant.create', Controllers\AddMerchantController::class)
        ->post('/nodeloc/location/add', 'location.create', Controllers\AddLocationController::class)
        ->post('/nodeloc/tag/add', 'tag.create', Controllers\AddTagController::class)
        ->post('/nodeloc/vps/hide', 'VPS.hide', Controllers\HideController::class)
        ->post('/nodeloc/vps/approve', 'VPS.approve', Controllers\ApproveController::class)
        ->post('/nodeloc/vps/like', 'VPS.like', Controllers\LikeController::class)
        ->post('/nodeloc/vps/view', 'VPS.view', Controllers\ViewAddController::class)
        ->get('/merchants', 'merchants.index', ListMerchantsController::class)
        ->get('/locations', 'locations.index', ListLocationsController::class)
        ->get('/vpstags', 'vpstags.index', ListVpsTagsController::class),
    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attribute('canAddProduct', function (ForumSerializer $serializer) {
            return $serializer->getActor()->hasPermission("vps.canAddProduct");
        }),
    (new Extend\Console())
        ->command(Command\UpdateCurrencyRates::class)
        ->schedule('vps:currency-rates', function (Event $event) {
            $event->dailyAt('04:00');
        })
];
