# Portfolio Application

A modern, full-stack portfolio application built for a sales and marketing professional.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Netlify Functions (serverless)
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Netlify

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Run development server:
```bash
npm run dev
```

## Deployment

The app is automatically deployed to Netlify when changes are pushed to the main branch.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
```bash
netlify deploy --prod
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NETLIFY_AUTH_TOKEN`: Netlify authentication token
- `NETLIFY_SITE_ID`: Netlify site identifier