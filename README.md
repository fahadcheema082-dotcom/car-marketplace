# CarYard — Car Marketplace

A car buy/sell marketplace with search, seller listings, and an AI chat assistant.

## Setup Steps

### 1. Create your Supabase project
1. Go to https://supabase.com/dashboard and click "New Project".
2. Name it `car-marketplace`, set a database password (save it somewhere), pick a region close to the UK.
3. Once created, go to **SQL Editor > New query**, paste the contents of `supabase-schema.sql`, and click Run.
4. Go to **Storage**, click "New bucket", name it `car-images`, and toggle it to **Public**.
5. Go to **Project Settings > API**. Copy the **Project URL** and the **anon public key** — you'll need these next.

### 2. Get a Claude API key
1. Go to https://console.anthropic.com and create an API key.
2. Copy it — you'll need it in the next step.

### 3. Set up environment variables
1. In this project, copy `.env.example` to a new file named `.env.local`.
2. Fill in the three values you copied above.

### 4. Push this code to GitHub
1. Create a new repository at https://github.com/new (name it `car-marketplace`).
2. In this project folder, run:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/car-marketplace.git
   git push -u origin main
   ```

### 5. Deploy on Vercel
1. Go to https://vercel.com/new and import your `car-marketplace` GitHub repo.
2. Before clicking Deploy, add your 3 environment variables (same as `.env.local`) under **Environment Variables**.
3. Click Deploy. In about a minute your site will be live on a `*.vercel.app` URL.

### 6. Try it out
- Visit `/seller` to add your first car listing.
- Visit `/listings` to browse and search.
- Click the chat bubble (bottom-right) to try the AI assistant.

## Local development
```
npm install
npm run dev
```
Then open http://localhost:3000

## Notes
- The site name "CarYard" in `components/Navbar.js` and `app/layout.js` is a placeholder — change it to whatever name your brother wants for his business.
- Everything runs on free tiers (Vercel, Supabase). The only potential cost is Claude API usage for the chat feature, which is very low for a small site.
