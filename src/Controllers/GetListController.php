<?php

namespace Nodeloc\VPS\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Flarum\Http\UrlGenerator;
use Flarum\Query\QueryCriteria;
use Flarum\Http\RequestUtil;
use Nodeloc\VPS\Filter\GetListFilter;
use Nodeloc\VPS\Serializer\GetListSerializer;

class GetListController extends AbstractListController
{
    public $serializer = GetListSerializer::class;

    public $limit = 15;

    public $maxLimit = 100;

    protected $filterer;

    // 指定要包含的关系
    public $include = ["user", "merchant", "location", "tags"];

    public $sort = ['created_at' => 'desc'];

    public $sortFields = ['created_at', 'cpu','memory','storage','bandwidth','gig','price','score'];

    protected $url;

    public function __construct(GetListFilter $filterer, UrlGenerator $url)
    {
        $this->filterer = $filterer;
        $this->url = $url;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        $filters = $this->extractFilter($request);

        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $include = $this->extractInclude($request);
        $sort = $this->extractSort($request);
        $sortIsDefault = $this->sortIsDefault($request);

        $criteria = new QueryCriteria($actor, $filters, $sort, $sortIsDefault);

        $results = $this->filterer->filter($criteria, $limit, $offset);

        $document->addPaginationLinks(
            $this->url->to('api')->route('VPS.list'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $results->areMoreResults() ? null : 0
        );

        $results = $results->getResults();

        // 使用 Eloquent 的 `with` 方法加载关联关系
        $results->load(['user', 'merchant', 'location', 'tags']);

        $this->loadRelations($results, $include);

        return $results;
    }
}
