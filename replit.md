# Portfolio Application - Sales & Marketing Professional Website

## Overview

This is a modern, full-stack portfolio application built for a sales and marketing professional. The application features a responsive React frontend with a Node.js/Express backend, showcasing professional skills, experience, and providing a contact form for potential clients.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Comprehensive shadcn/ui library with Radix UI primitives

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API endpoints for contact form submissions

### Development Setup
- **Monorepo Structure**: Client and server code in same repository
- **Hot Reload**: Vite dev server with Express middleware integration
- **Type Safety**: Shared TypeScript schemas between client and server

## Key Components

### Frontend Components
1. **Navigation**: Fixed header with smooth scroll navigation
2. **Hero Section**: Landing area with call-to-action buttons
3. **About Section**: Professional background and statistics
4. **Skills Section**: Interactive skill cards with icons
5. **Journey Section**: Professional timeline/experience
6. **Services Section**: Consulting services with pricing
7. **Contact Section**: Form with validation and submission handling
8. **Footer**: Links and social media integration

### Backend Components
1. **Express Server**: Main application server with middleware
2. **API Routes**: Contact form submission and retrieval endpoints
3. **Database Schema**: User and contact submission tables
4. **Storage Layer**: Abstracted storage interface with in-memory implementation
5. **Error Handling**: Comprehensive error handling and logging

### Shared Components
1. **Database Schema**: Drizzle schema definitions with Zod validation
2. **Type Definitions**: Shared TypeScript types for API communication

## Data Flow

### Contact Form Submission
1. User fills out contact form on frontend
2. Form data validated using Zod schemas
3. Data sent to `/api/contact` POST endpoint
4. Backend validates data and stores in database
5. Success/error response sent back to frontend
6. Toast notification displayed to user

### Data Validation
- **Frontend**: Form validation using react-hook-form with Zod resolvers
- **Backend**: Request validation using shared Zod schemas
- **Database**: Schema constraints enforced by Drizzle ORM

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, React DOM
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **UI Components**: Radix UI primitives, Lucide React icons
- **Form Handling**: React Hook Form with Zod resolvers
- **HTTP Client**: Fetch API with TanStack Query
- **Routing**: Wouter for lightweight routing
- **Date Handling**: date-fns for date formatting

### Backend Dependencies
- **Server**: Express.js with TypeScript support
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Validation**: Zod for schema validation
- **Session**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build Tool**: Vite with React plugin
- **Type Checking**: TypeScript compiler
- **Database Management**: Drizzle Kit for migrations
- **Replit Integration**: Custom Vite plugins for Replit environment

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express middleware
- **Hot Reload**: Automatic reloading for both client and server changes
- **Database**: Development database connection via DATABASE_URL environment variable

### Production Build
1. **Frontend Build**: Vite builds optimized static assets to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Static Serving**: Express serves built frontend assets in production
4. **Database Migrations**: Drizzle Kit handles database schema changes

### Environment Configuration
- **Development**: NODE_ENV=development with Vite middleware
- **Production**: NODE_ENV=production with static file serving
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Session Storage**: PostgreSQL-backed sessions for scalability

### Database Strategy
- **ORM**: Drizzle ORM provides type-safe database operations
- **Migrations**: Drizzle Kit manages schema migrations in `./migrations` directory
- **Connection**: Neon Database serverless PostgreSQL for scalable hosting
- **Fallback**: In-memory storage implementation for development/testing

The application is designed to be easily deployable to various platforms with minimal configuration, requiring only a PostgreSQL database connection string and proper environment variable setup.