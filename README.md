# SmartLivings

Production Next.js website for SmartLivings with:
- premium marketing homepage
- EN/NL language selector
- client login (Google, X, email/password) via Supabase Auth
- contact form with file upload
- SMTP email notifications
- external submission storage (Supabase)
- authenticated admin dashboard (`/admin`)

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Required Environment Variables

Copy from `.env.example` and set real values:
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET`, `SUPABASE_SUBMISSIONS_TABLE`
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_ENABLE_CLIENT_LOGIN` (`false` to disable, `true` to enable)

## Supabase Setup (External Storage)

1. Create table:

```sql
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  project_type text not null,
  budget_range text not null,
  message text not null,
  file_name text,
  file_type text,
  file_size bigint,
  file_path text,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
```

2. Create private storage bucket (default bucket name in app is `contact-files`):

```sql
insert into storage.buckets (id, name, public)
values ('contact-files', 'contact-files', false)
on conflict (id) do nothing;
```

The app writes using `SUPABASE_SERVICE_ROLE_KEY`, so storage/table policies are not required for server writes.

## Client Login Setup (Supabase Auth)

1. In Supabase dashboard:
- Go to `Authentication` -> `URL Configuration`.
- Set `Site URL` to your app URL (`http://localhost:3000` for local).
- Add redirect URLs:
`http://localhost:3000/auth/callback`
`https://your-production-domain/auth/callback`

2. Enable providers:
- `Authentication` -> `Providers` -> enable `Google`
- `Authentication` -> `Providers` -> enable `Twitter (X)`
- Add provider credentials from Google Cloud / X Developer portal.

3. Client routes:
- Login: `/login`
- Account: `/account`

Social login and email/password login are both available.

If you want login disabled for now, keep:

```env
NEXT_PUBLIC_ENABLE_CLIENT_LOGIN=false
```

## Admin Dashboard

- URL: `http://localhost:3000/admin/login`
- Auth: username/password from `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- Session: signed HTTP-only cookie using `ADMIN_SESSION_SECRET`
- Dashboard lists submissions from Supabase table

## Email Flow

On each form submission:
1. submission is saved to Supabase (+ file uploaded to storage if included)
2. notification email sent to business inbox
3. confirmation email sent to the user

## Build & Verify

```bash
npm run lint
npm run build
npm run start
```
