<?php

namespace Nodeloc\VPS\Controllers;

use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Nodeloc\VPS\Logic\AddTagLogic;
use Nodeloc\VPS\Policy\UserPolicy;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Flarum\Foundation\ValidationException;

class AddTagController implements RequestHandlerInterface
{
    protected $userPolicy;

    public function __construct(UserPolicy $userPolicy)
    {
        $this->userPolicy = $userPolicy;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);

        // Check if the actor is registered and has permission to add tags
        if (!$this->userPolicy->allowAdd($actor)) {
            throw new ValidationException(['user' => 'You do not have permission to add tags.']);
        }

        // Proceed with adding tag
        return new JsonResponse(resolve(AddTagLogic::class)->save($actor, $request->getParsedBody()));
    }
}
