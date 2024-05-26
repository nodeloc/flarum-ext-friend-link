<?php

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Database\Schema\Builder;


return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('vps_currency')) {
            return;
        }

        $schema->create('vps_currency', function (Blueprint $table) {
            $table->increments('id');
            $table->string('currency', 255)->nullable();
            $table->decimal('rate', 10, 4)->nullable();
        });
    },
    'down' => function (Builder $schema) {

    },
];
