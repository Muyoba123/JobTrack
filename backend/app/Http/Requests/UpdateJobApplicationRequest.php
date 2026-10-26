<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateJobApplicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'company_name' => ['sometimes', 'required', 'string', 'max:255'],
            'job_title' => ['sometimes', 'required', 'string', 'max:255'],
            'location' => ['sometimes', 'nullable', 'string', 'max:255'],

            'status' => [
                'sometimes',
                'required',
                Rule::in([
                    'applied',
                    'interview',
                    'offer',
                    'rejected',
                    'withdrawn',
                ]),
            ],

            'application_date' => [
                'sometimes',
                'required',
                'date',
                'date_format:Y-m-d',
            ],

            'job_url' => ['sometimes', 'nullable', 'url', 'max:2048'],
            'notes' => ['sometimes', 'nullable', 'string', 'max:5000'],
        ];
    }
}