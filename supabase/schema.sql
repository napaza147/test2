-- ============================================================
-- 1. Store Clerk's user_id as the primary key
--    Clerk uses string IDs like "user_2abc123"
-- ============================================================

create table if not exists public.profiles (
  id            text        primary key,          -- Clerk user_id
  email         text        not null unique,
  full_name     text,
  preferred_currency  text  default 'USD',
  kyc_status    text        default 'pending'      -- pending | verified | rejected
                check (kyc_status in ('pending', 'verified', 'rejected')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table if not exists public.transactions (
  id            uuid        primary key default gen_random_uuid(),
  user_id       text        not null references public.profiles(id) on delete cascade,
  amount        numeric(18, 8) not null,
  currency_from text        not null,
  currency_to   text        not null,
  rate          numeric(18, 8) not null,
  type          text        not null               -- conversion | deposit | withdrawal
                check (type in ('conversion', 'deposit', 'withdrawal')),
  status        text        default 'completed'
                check (status in ('pending', 'completed', 'failed')),
  created_at    timestamptz default now()
);

-- ============================================================
-- 2. Auto-update updated_at on profiles
-- ============================================================

create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- ============================================================
-- 3. Row Level Security — users can only touch their own rows
-- ============================================================

alter table public.profiles     enable row level security;
alter table public.transactions enable row level security;

-- Profiles: read/write own row only
create policy "profiles: own row" on public.profiles
  for all
  using      ( id = requesting_user_id() )
  with check ( id = requesting_user_id() );

-- Transactions: read own rows only; insert own rows only
create policy "transactions: own read" on public.transactions
  for select using ( user_id = requesting_user_id() );

create policy "transactions: own insert" on public.transactions
  for insert with check ( user_id = requesting_user_id() );

-- ============================================================
-- 4. Helper: extract Clerk user_id from the JWT
--    Clerk puts the user id in the "sub" claim
-- ============================================================

create or replace function public.requesting_user_id()
returns text language sql stable as $$
  select nullif(
    current_setting('request.jwt.claims', true)::json->>'sub',
    ''
  )::text;
$$;

-- ============================================================
-- 5. Indexes for common query patterns
-- ============================================================

create index if not exists transactions_user_id_idx
  on public.transactions (user_id, created_at desc);