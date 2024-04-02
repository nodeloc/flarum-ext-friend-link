<?php
namespace Nodeloc\FriendLink\Controllers;

use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Flarum\Foundation\ValidationException;
use Nodeloc\FriendLink\Logic\AddLogic;

class AddController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();
        $file = Arr::get($request->getUploadedFiles(), 'sitelogo');

        return new JsonResponse( resolve(AddLogic::class)->save($actor, $request->getParsedBody(),$file) );
    }
}
