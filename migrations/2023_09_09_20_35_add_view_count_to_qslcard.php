<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasColumn('friend_link', 'view_count')) {
            $schema->table('friend_link', function (Blueprint $table) use ($schema) {
                $table->integer('view_count')->default(0);
            });
        }
    },
    'down' => function (Builder $schema) {

    },
];
