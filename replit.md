# World Cuisine Recipe Website

## Overview

This is a comprehensive full-stack web application featuring international cuisine recipes from 10 different countries (Turkish, Italian, Japanese, Mexican, Spanish, Thai, Chinese, French, Indian, and Greek). The application provides users with detailed recipes, including ingredients, instructions, cooking tips, and nutritional information. It's built with a modern React frontend and Express backend, using TypeScript throughout. The system now processes all 104 recipes from the provided cuisine files.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Development**: Uses in-memory storage for development, designed for PostgreSQL in production
- **API**: RESTful API endpoints for recipes and cuisines

## Key Components

### Data Models
- **Recipe**: Contains name, cuisine, category, origin, flavor profile, ingredients, instructions, tips, serving suggestions, nutrition info, cooking time, servings, difficulty, and rating
- **Cuisine**: Contains name, flag emoji, description, featured dishes, and image URL

### Frontend Components
- **Home Page**: Hero section with search bar, featured recipes, and cuisine grid
- **Recipe Cards**: Display recipe information with ratings and cuisine flags
- **Recipe Modal**: Detailed recipe view with ingredients, instructions, and tips
- **Cuisine Pages**: Filtered recipes by cuisine type
- **Search Functionality**: Search across recipes, cuisines, and ingredients
- **Navbar**: Navigation with dropdown menu for cuisines

### Backend Services
- **RecipeParser**: Parses recipe data from text files in the attached_assets directory
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **API Routes**: RESTful endpoints for recipes and cuisines

## Data Flow

1. **Data Initialization**: Recipe data is parsed from text files on server startup
2. **API Requests**: Frontend makes HTTP requests to backend API endpoints
3. **Data Fetching**: TanStack Query manages API calls and caching
4. **State Management**: Component state for UI interactions, server state managed by TanStack Query
5. **Rendering**: React components render data with Tailwind CSS styling

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives with shadcn/ui
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Data Fetching**: TanStack React Query
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Utilities**: date-fns for date formatting

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL support (@neondatabase/serverless)
- **Validation**: Zod for schema validation
- **Session Management**: connect-pg-simple for PostgreSQL session store
- **Development**: tsx for TypeScript execution

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: Express server with TypeScript compilation via tsx
- **Database**: In-memory storage for development
- **Build**: Vite builds frontend, esbuild bundles backend

### Production Environment
- **Frontend**: Static files served from dist/public
- **Backend**: Compiled JavaScript bundle in dist/
- **Database**: PostgreSQL database (configured via DATABASE_URL environment variable)
- **Deployment**: Designed for platforms like Replit, Vercel, or similar

### Key Configuration Files
- **Database**: drizzle.config.ts for database migrations
- **Frontend**: vite.config.ts with path aliases and plugins
- **TypeScript**: tsconfig.json with path mapping for imports
- **Styling**: tailwind.config.ts with custom color scheme and component paths

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout, and a responsive design optimized for recipe browsing and discovery.