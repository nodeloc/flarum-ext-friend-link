<?php

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Database\Schema\Builder;


return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('vps')) {
            return;
        }

        $schema->create('vps', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->integer('merchant_id');
            $table->integer('location_id')->default(0);
            $table->string('product_name', 255);
            $table->tinyInteger('product_type');
            $table->tinyInteger('score')->nullable();
            $table->integer('cpu');
            $table->integer('memory');
            $table->integer('storage');
            $table->integer('disk_type');
            $table->integer('bandwidth');
            $table->integer('gig');
            $table->decimal('cost', 10, 2)->nullable();
            $table->tinyInteger('currency')->nullable();
            $table->integer('payment_cycle')->default(0);
            $table->decimal('price', 10, 2)->nullable();
            $table->string('monitor_url', 255)->nullable();
            $table->string('monitor_rule', 255)->nullable();
            $table->tinyInteger('available')->nullable();
            $table->string('review_url', 255)->nullable();
            $table->string('buy_url', 255)->nullable();
            $table->tinyInteger('status')->nullable();
            $table->timestamps();

            $table->index('user_id', 'vps_user_id_index');
        });
    },
    'down' => function (Builder $schema) {

    },
];
