<?php

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Database\Schema\Builder;


return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('friend_link')) {
            return;
        }

        $schema->create('friend_link', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id')->index();
            $table->text('img_list')->default('');
            $table->integer('cover_width');
            $table->integer('cover_height');
            $table->integer('like_count');
            $table->integer('exchange_count');
            $table->tinyInteger('status')->default(0);
            $table->integer('created_time');
            $table->integer('update_time');
            $table->string('sitename');
            $table->string('siteurl');
            $table->string('sitelogourl');
        });
    },
    'down' => function (Builder $schema) {

    },
];
