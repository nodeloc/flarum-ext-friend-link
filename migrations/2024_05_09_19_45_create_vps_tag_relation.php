<?php

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Database\Schema\Builder;


return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('vps_tag_relation')) {
            return;
        }

        $schema->create('vps_tag_relation', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('vps_id');
            $table->integer('tag_id');

        });
    },
    'down' => function (Builder $schema) {

    },
];
