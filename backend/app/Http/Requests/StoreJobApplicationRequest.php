<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreJobApplicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'company_name' => ['required', 'string', 'max:255'],
            'job_title' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],

            'status' => [
                'sometimes',
                Rule::in([
                    'applied',
                    'interview',
                    'offer',
                    'rejected',
                    'withdrawn',
                ]),
            ],

            'application_date' => ['required', 'date', 'date_format:Y-m-d'],
            'job_url' => ['nullable', 'url', 'max:2048'],
            'notes' => ['nullable', 'string', 'max:5000'],
        ];
    }
}