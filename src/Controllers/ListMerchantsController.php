<?php

namespace Nodeloc\VPS\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Nodeloc\VPS\Model\Merchant;
use Nodeloc\VPS\Serializer\MerchantSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Collection;

class ListMerchantsController extends AbstractListController
{
    public $serializer = MerchantSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document): Collection
    {
        return Merchant::all();
    }
}
