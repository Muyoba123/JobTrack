<?php

namespace App\Repositories\Contracts;

use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface JobApplicationRepositoryInterface
{
    public function getAllByUser(User $user): Collection;

    public function findByUser(
        User $user,
        int $id
    ): JobApplication;

    public function create(
        User $user,
        array $data
    ): JobApplication;

    public function update(
        JobApplication $application,
        array $data
    ): JobApplication;

    public function delete(
        JobApplication $application
    ): bool;
}