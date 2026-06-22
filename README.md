# Bookstore

A full-stack bookstore app built with React and Supabase, featuring a real PostgreSQL database, shopping cart, and Stripe checkout integration.

🌐 **Live demo:** https://bookstore-tan.vercel.app/

![Bookstore Screenshot](bookstore-ss.png)

## Features

- 📚 Book catalog fetched from a real PostgreSQL database (Supabase)
- 🛒 Shopping cart with quantity controls, persistent via localStorage
- 🎉 Animated cart drawer with live total
- 💳 Stripe checkout integration (test mode)
- ✅ Order saved to database before redirecting to payment
- 📦 Out-of-stock detection
- 📱 Fully responsive design

## Tech Stack

- React 19
- Tailwind CSS 3
- Supabase (PostgreSQL + Edge Functions)
- Stripe (payments)
- React Router v6
- Vite
- Deployed on Vercel

## Technical decisions

- **Supabase Edge Functions** — used to call the Stripe API server-side, keeping the secret key out of the frontend bundle entirely.
- **Row Level Security (RLS)** — enabled on all tables from the start, with explicit policies for each operation, following security best practices.
- **`useCart` custom hook** — centralizes all cart logic (add, remove, update quantity, persist, clear) separately from UI components.
- **`jsonb` column for order items** — stores the full cart snapshot as JSON in the orders table, keeping the schema simple without sacrificing query flexibility.
- **React Router** — handles client-side routing between the store and the success page, allowing Stripe to redirect back to a specific URL after payment.

## Database schema

```sql
-- Products catalog
create table books (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  author text not null,
  price numeric(10,2) not null,
  description text,
  cover_url text,
  stock integer default 10,
  created_at timestamp default now()
);

-- Orders placed after checkout
create table orders (
  id uuid default gen_random_uuid() primary key,
  total numeric(10,2) not null,
  items jsonb not null,
  status text default 'pending',
  created_at timestamp default now()
);
```

## Run locally

```bash
git clone https://github.com/LaloCHL/bookstore.git
cd bookstore
npm install
npm run dev
```

> Note: You'll need your own Supabase project and Stripe keys to run this locally.

## Author

Eduardo Chan — [linkedin.com/in/chaneduardo](https://linkedin.com/in/chaneduardo)