<?php

namespace Nodeloc\VPS\Policy;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy{
    public function allowAdd(User $actor){
        if (( $actor->hasPermission('vps.allowAdd') && !$this->isSuspended($actor))) {

            return true;
        }
        return false;
    }

    protected function isSuspended(User $user): bool{
        return $user->suspended_until !== null
            && $user->suspended_until instanceof Carbon
            && $user->suspended_until->isFuture();
    }
}
