<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Repositories\Contracts\JobApplicationRepositoryInterface;
use App\Repositories\JobApplicationRepository;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            JobApplicationRepositoryInterface::class,
            JobApplicationRepository::class
        );
    }

    public function boot(): void
    {
        //
    }
}