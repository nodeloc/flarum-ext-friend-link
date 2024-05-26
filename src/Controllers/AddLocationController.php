<?php

namespace Nodeloc\VPS\Controllers;

use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Nodeloc\VPS\Logic\AddLocationLogic;
use Nodeloc\VPS\Policy\UserPolicy;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Flarum\Foundation\ValidationException;

class AddLocationController implements RequestHandlerInterface
{
    protected $userPolicy;

    public function __construct(UserPolicy $userPolicy)
    {
        $this->userPolicy = $userPolicy;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);

        // Check if the actor is registered and has permission to add location
        if (!$this->userPolicy->allowAdd($actor)) {
            throw new ValidationException(['user' => 'You do not have permission to add locations.']);
        }

        // Proceed with adding location
        return new JsonResponse(resolve(AddLocationLogic::class)->save($actor, $request->getParsedBody()));
    }
}
