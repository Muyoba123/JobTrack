FROM richarvey/nginx-php-fpm:3.1.6

WORKDIR /var/www/html

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY . .

# Install production dependencies during build time
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader

# Ensure Laravel's runtime directories exist before configuration is cached
RUN mkdir -p \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/framework/testing \
    storage/logs \
    bootstrap/cache \
    && chmod -R 777 storage bootstrap/cache

ENV SKIP_COMPOSER=1
ENV WEBROOT=/var/www/html/public
ENV PHP_CATCHALL=true
ENV PHP_ERRORS_STDERR=1
ENV RUN_SCRIPTS=1
ENV REAL_IP_HEADER=1

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr
ENV VIEW_COMPILED_PATH=/var/www/html/storage/framework/views

CMD ["/start.sh"]