-- Auth attempt log for server-side rate limiting
create table if not exists public.auth_attempts (
  id          uuid        primary key default gen_random_uuid(),
  key         text        not null,   -- ip:email composite key
  ip          text        not null,
  email       text        not null,
  success     boolean     not null default false,
  created_at  timestamptz not null default now()
);

-- Index for fast window lookups
create index if not exists auth_attempts_key_time_idx
  on public.auth_attempts (key, created_at desc);

-- Auto-purge rows older than 24 hours to keep the table lean
create or replace function public.purge_old_auth_attempts()
returns void language sql as $$
  delete from public.auth_attempts
  where created_at < now() - interval '24 hours';
$$;

-- Run purge daily via pg_cron (enable in Supabase dashboard → Extensions)
select cron.schedule(
  'purge-auth-attempts',
  '0 3 * * *',
  $$ select public.purge_old_auth_attempts(); $$
);