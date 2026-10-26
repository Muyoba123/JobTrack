#!/usr/bin/env bash

set -e

echo "Installing Laravel production dependencies..."
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --working-dir=/var/www/html

echo "Caching Laravel configuration..."
php artisan config:cache

echo "Caching Laravel routes..."
php artisan route:cache

echo "Laravel deployment preparation completed."