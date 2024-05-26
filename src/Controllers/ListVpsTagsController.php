<?php

namespace Nodeloc\VPS\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Nodeloc\VPS\Model\Tag;
use Nodeloc\VPS\Serializer\TagSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Collection;

class ListVpsTagsController extends AbstractListController
{
    public $serializer = TagSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document): Collection
    {
        return Tag::all();
    }
}
