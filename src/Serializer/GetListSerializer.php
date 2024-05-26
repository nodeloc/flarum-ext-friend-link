<?php

namespace Nodeloc\VPS\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\User\User;
use Nodeloc\VPS\Model\VPSAction;

class GetListSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'vpsList';

    protected $actor;

    /**
     * {@inheritdoc}
     */
    protected function getDefaultAttributes($vps)
    {
        return [
            'id' => $vps->id,
            'uid' => $vps->user_id,
            'product_name' => $vps->product_name,
            'product_type' => $vps->product_type,
            'score' => $vps->score,
            'merchant_id' => $vps->merchant_id,
            'location_id' => $vps->location_id,
            'cpu' => $vps->cpu,
            'memory' => $vps->memory,
            'storage' => $vps->storage,
            'disk_type' => $vps->disk_type,
            'bandwidth' => $vps->bandwidth,
            'gig' => $vps->gig,
            'cost' => $vps->cost,
            'currency' => $vps->currency,
            'payment_cycle' => $vps->payment_cycle,
            'price' => $vps->price,
            'monitor_url' => $vps->monitor_url,
            'monitor_rule' => $vps->monitor_rule,
            'available' => $vps->available,
            'review_url' => $vps->review_url,
            'status' => $vps->status,
            'buy_url' => $vps->buy_url,
        ];
    }

    public function user($model)
    {
        return $this->hasOne($model, UserSerializer::class);
    }

    public function merchant($model)
    {
        return $this->hasOne($model, MerchantSerializer::class);
    }

    public function location($model)
    {
        return $this->hasOne($model, LocationSerializer::class);
    }

    public function tags($model)
    {
        return $this->hasMany($model, TagSerializer::class);
    }
}
