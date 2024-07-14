# Run di local

```bash
git clone https://github.com/AdiCahyaSaputra/laravel-playground
cd laravel-playground

composer install
npm install

mv .env.example .env # Setup .env dulu

# QUEUE_CONNECTION=database
# FILESYSTEM_DISK=public

php artisan key:generate
php artisan storage:link
php artisan migrate:fresh --seed

php artisan ser
npm run dev

# Run queue worker
php artisan queue:listen

```

## Tech Stack
- Laravel 11 x Inertia ReactJS
- Shadcn/UI

## Todo
- [x] Queue dan Jobs
- [ ] Redis
- [ ] Event dan Broadcasts (Reverb ?)
