<?php

namespace Nodeloc\VPS\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;

class LocationSerializer extends AbstractSerializer
{
    protected $type = 'vps_locations';

    protected function getDefaultAttributes($location)
    {
        return [
            'id' => $location->id,
            'location_name' => $location->location_name,
            'location_intro' => $location->location_intro,
        ];
    }
}
