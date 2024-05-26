<?php

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Database\Schema\Builder;


return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('vps_location')) {
            return;
        }

        $schema->create('vps_location', function (Blueprint $table) {
            $table->increments('id');
            $table->string('location_name', 255);
            $table->string('location_intro', 255)->nullable();
        });
    },
    'down' => function (Builder $schema) {

    },
];
