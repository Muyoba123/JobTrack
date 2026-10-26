<?php

namespace App\Services;

use App\Models\JobApplication;
use App\Models\User;
use App\Repositories\Contracts\JobApplicationRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class JobApplicationService
{
    public function __construct(
        protected JobApplicationRepositoryInterface $repository
    ) {}

    public function getAllApplications(User $user): Collection
    {
        return $this->repository->getAllByUser($user);
    }

    public function getApplication(
        User $user,
        int $id
    ): JobApplication {

        return $this->repository->findByUser($user, $id);
    }

    public function createApplication(
        User $user,
        array $data
    ): JobApplication {

        return $this->repository->create($user, $data);
    }

    public function updateApplication(
        User $user,
        int $id,
        array $data
    ): JobApplication {

        $application = $this->repository->findByUser(
            $user,
            $id
        );

        return $this->repository->update(
            $application,
            $data
        );
    }

    public function deleteApplication(
        User $user,
        int $id
    ): bool {

        $application = $this->repository->findByUser(
            $user,
            $id
        );

        return $this->repository->delete($application);
    }
}