<?php

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Database\Schema\Builder;


return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('vps_tag')) {
            return;
        }

        $schema->create('vps_tag', function (Blueprint $table) {
            $table->increments('id');
            $table->string('tag_name', 255);
            $table->string('tag_intro', 255)->nullable();
        });
    },
    'down' => function (Builder $schema) {

    },
];
