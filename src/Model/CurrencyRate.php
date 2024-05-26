<?php

namespace Nodeloc\VPS\Model;

use Illuminate\Database\Eloquent\Model;

class CurrencyRate extends Model
{
    protected $table = 'vps_currency';
    public $timestamps = false;

    protected $fillable = [
        'currency',
        'rate'
    ];
}
