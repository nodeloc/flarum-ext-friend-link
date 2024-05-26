<?php

namespace Nodeloc\VPS\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;

class MerchantSerializer extends AbstractSerializer
{
    protected $type = 'vps_merchants';

    protected function getDefaultAttributes($merchant): array
    {
        return [
            'id' => $merchant->id,
            'merchant_name' => $merchant->merchant_name,
            'merchant_intro' => $merchant->merchant_intro,
            'merchant_url' => $merchant->merchant_url,
            'merchant_link' => $merchant->merchant_link,
            'merchant_homepage' => $merchant->merchant_homepage,
            'merchant_type' => $merchant->merchant_type,
        ];
    }
}
