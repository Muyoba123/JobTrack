<?php

namespace App\Repositories;

use App\Models\JobApplication;
use App\Models\User;
use App\Repositories\Contracts\JobApplicationRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class JobApplicationRepository implements JobApplicationRepositoryInterface
{
    public function getAllByUser(User $user): Collection
    {
        return $user->jobApplications()
            ->latest()
            ->get();
    }

    public function findByUser(
        User $user,
        int $id
    ): JobApplication {

        return $user->jobApplications()
            ->findOrFail($id);
    }

    public function create(
        User $user,
        array $data
    ): JobApplication {

        return $user->jobApplications()->create($data);
    }

    public function update(
        JobApplication $application,
        array $data
    ): JobApplication {

        $application->update($data);

        return $application->refresh();
    }

    public function delete(
        JobApplication $application
    ): bool {

        return (bool) $application->delete();
    }
}