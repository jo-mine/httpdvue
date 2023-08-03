FROM php:7.4-apache

RUN apt-get update && apt-get install -y vim zip unzip

RUN apt-get install -y libpq-dev \
    libonig-dev \
    && docker-php-ext-install pdo pdo_mysql mysqli

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer