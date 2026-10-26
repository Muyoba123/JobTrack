#!/usr/bin/env bash

set -e

cd /var/www/html

echo "Creating Laravel runtime directories..."

mkdir -p \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/framework/testing \
    storage/logs \
    bootstrap/cache

chmod -R 777 storage bootstrap/cache

echo "Installing Laravel production dependencies..."

composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --working-dir=/var/www/html

echo "Clearing old Laravel configuration cache..."

php artisan config:clear

echo "Caching Laravel configuration..."

php artisan config:cache

echo "Laravel deployment preparation completed."