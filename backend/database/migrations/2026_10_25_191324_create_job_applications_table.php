<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_applications', function (Blueprint $table) {

            $table->id();

            // The user who owns the application
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            // Job information
            $table->string('company_name');
            $table->string('job_title');
            $table->string('location')->nullable();

            // Application details
            $table->string('status')->default('applied');
            $table->date('application_date');
            $table->string('job_url')->nullable();
            $table->text('notes')->nullable();

            $table->timestamps();

            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};