<?php

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Database\Schema\Builder;


return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('friend_link_action')) {
            return;
        }

        $schema->create('friend_link_action', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('friend_link_id')->index();
            $table->unsignedInteger('user_id');
            $table->tinyInteger('type')->default(0); //0点赞
            $table->integer('created_time');
        });
    },
    'down' => function (Builder $schema) {

    },
];
