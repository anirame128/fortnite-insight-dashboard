# Fortnite Insight Dashboard

A full-stack application that combines user profile management with Fortnite.gg map statistics and forecasting capabilities.

## Features

- 🔐 User authentication with Supabase
- 👤 Profile management with CRUD operations
- 📊 Fortnite map statistics dashboard
- 📈 30-day player count forecasting
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure API endpoints with row-level security

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Supabase (Auth + Postgres)
- Tailwind CSS
- Chart.js for data visualization
- Holt-Winters forecasting algorithm

## Setup & Run

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fortnite-insight-dashboard.git
cd user-profile-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=supabase_anon_key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=supabase_service_role_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Approach & Assumptions

The application uses Supabase for authentication and data persistence, with row-level security ensuring users can only access their own profile data. The Fortnite.gg data is fetched through a combination of web scraping and API endpoints, with the Holt-Winters forecasting algorithm providing accurate predictions for player counts.

The forecasting model accounts for seasonality (weekly patterns) and trend components, making it particularly suitable for Fortnite player data which often shows weekly patterns due to regular updates and events.

## Data Collection & Forecasting

The application collects Fortnite map statistics through a combination of:
- Direct API calls to Fortnite.gg endpoints
- Web scraping for historical data
- Data normalization and cleaning

The forecasting uses the Holt-Winters triple exponential smoothing algorithm, which:
- Models level, trend, and seasonality simultaneously
- Adapts to changing patterns in player counts
- Provides confidence intervals for predictions
- Falls back to naive forecasting when insufficient data is available
