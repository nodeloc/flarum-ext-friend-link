<?php

namespace Nodeloc\VPS\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use InvalidArgumentException;

class TagSerializer extends AbstractSerializer
{
    protected $type = 'vps_tags';

    protected function getDefaultAttributes($tag)
    {
        if (!($tag instanceof \Nodeloc\VPS\Model\Tag)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . \Nodeloc\VPS\Model\Tag::class
            );
        }

        return [
            'id' => $tag->id,
            'tag_name' => $tag->tag_name,
            'tag_intro' => $tag->tag_intro
        ];
    }
}
