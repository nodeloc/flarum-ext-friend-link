<?php

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Database\Schema\Builder;


return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('vps_merchant')) {
            return;
        }

        $schema->create('vps_merchant', function (Blueprint $table) {
            $table->increments('id');
            $table->string('merchant_name', 255);
            $table->string('merchant_intro', 512)->nullable();
            $table->string('merchant_url', 255);
            $table->tinyInteger('merchant_type')->nullable()->comment('0:国人商家 1:国人Oneman 2:国外商家 3:国外Oneman');
            $table->string('merchant_link', 255);
            $table->string('merchant_homepage', 255)->nullable();
        });
    },
    'down' => function (Builder $schema) {

    },
];
