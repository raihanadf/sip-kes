## Overview
web sistem informasi pelayanan kesehatan

## How to install
- Setup .env
  ```bash
  mv .env.example .env
  ```
  - rename the template to .env
  - sesuaiin aja sih sesuai keinginan

- Setup Laravel Project
  ```bash
  composer install && pnpm install && php artisan key:generate && php artisan storage:link
  ```
  - composer install
  - pnpm install
  - php artisan key:generate
  - php artisan storage:link

<hr/>

## How to run
- Serve make
  ```bash
  php artisan serve
  ```
  atau langsung
  ```bash
  composer dev
  ```
