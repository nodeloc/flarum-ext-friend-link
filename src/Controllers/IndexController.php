<?php

namespace Nodeloc\VPS\Controllers;

use Flarum\Frontend\Document;
use Psr\Http\Message\ServerRequestInterface;

class IndexController
{
    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        return $document;
    }
}
