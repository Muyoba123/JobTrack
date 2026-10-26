<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobApplicationRequest;
use App\Http\Requests\UpdateJobApplicationRequest;
use App\Services\JobApplicationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    public function __construct(
        protected JobApplicationService $service
    ) {}

    // GET /api/job-applications
    public function index(Request $request): JsonResponse
    {
        $applications = $this->service->getAllApplications(
            $request->user()
        );

        return response()->json([
            'message' => 'Job applications retrieved successfully.',
            'data' => $applications,
        ], 200);
    }

    // POST /api/job-applications
    public function store(
        StoreJobApplicationRequest $request
    ): JsonResponse {

        $application = $this->service->createApplication(
            $request->user(),
            $request->validated()
        );

        return response()->json([
            'message' => 'Job application created successfully.',
            'data' => $application,
        ], 201);
    }

    // GET /api/job-applications/{id}
    public function show(
        Request $request,
        int $id
    ): JsonResponse {

        $application = $this->service->getApplication(
            $request->user(),
            $id
        );

        return response()->json([
            'message' => 'Job application retrieved successfully.',
            'data' => $application,
        ], 200);
    }

    // PUT/PATCH /api/job-applications/{id}
    public function update(
        UpdateJobApplicationRequest $request,
        int $id
    ): JsonResponse {

        $application = $this->service->updateApplication(
            $request->user(),
            $id,
            $request->validated()
        );

        return response()->json([
            'message' => 'Job application updated successfully.',
            'data' => $application,
        ], 200);
    }

    // DELETE /api/job-applications/{id}
    public function destroy(
        Request $request,
        int $id
    ): JsonResponse {

        $this->service->deleteApplication(
            $request->user(),
            $id
        );

        return response()->json([
            'message' => 'Job application deleted successfully.',
        ], 200);
    }
}