<?php

namespace Nodeloc\VPS\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Nodeloc\VPS\Model\Location;
use Nodeloc\VPS\Serializer\LocationSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Collection;

class ListLocationsController extends AbstractListController
{
    public $serializer = LocationSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document): Collection
    {
        return Location::all();
    }
}
