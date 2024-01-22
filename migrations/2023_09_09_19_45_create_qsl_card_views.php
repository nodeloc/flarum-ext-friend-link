<?php

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Database\Schema\Builder;


return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('friend_link_views')) {
            return;
        }

        $schema->create('friend_link_views', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id')->nullable();
            $table->integer('friend_link_id')->index();
            $table->string('ip', 32);
            $table->integer('created_time')->default(0);
        });
    },
    'down' => function (Builder $schema) {

    },
];
