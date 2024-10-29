# Nutrition Website

This is a **Next.js** and **Tailwind CSS** based project that provides a dynamic nutrition information platform. The application allows users to explore nutrition data, manage user sessions, and access various features with the help of `Neon` and other APIs.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

To set up a local copy, follow these instructions.

### Prerequisites

- **Node.js**: Download and install the latest LTS version from [nodejs.org](https://nodejs.org).
- **npm or Yarn**: This project uses npm by default.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/nutrition-website.git
   cd nutrition-website
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**  
   Create a `.env` file in the root directory with the required environment variables (detailed below).

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Access the app at [http://localhost:3000](http://localhost:3000).

## Features

- **User Authentication**: Login and registration with secure password hashing (via `bcryptjs`) and session management.
- **Nutrition Data Display**: Fetches and displays nutrition data using APIs and custom components.
- **Responsive Design**: Fully responsive UI using Tailwind CSS.
- **Cookie Management**: Utilizes `js-cookie` for handling cookies and session persistence.
- **Date Management**: `date-fns` is used for managing and displaying dates effectively.

## Project Structure

```plaintext
nutrition-website
├── .next                # Next.js build output and cache
├── public               # Static assets and images
├── pages                # Page components for routing
├── components           # Reusable components (e.g., UI elements, widgets)
├── styles               # CSS and Tailwind styles
├── utils                # Utility functions (e.g., API calls, helpers)
├── tailwind.config.js   # Tailwind CSS configuration
├── next.config.mjs      # Next.js configuration
└── package.json         # Project metadata and dependencies
```

## Environment Variables

This project requires environment variables to function. Create a `.env` file at the root of your project with the following keys:

- `NEXT_PUBLIC_API_KEY`: Your API key for accessing nutrition data.
- `SUPABASE_URL`: URL for your Supabase project.
- `SUPABASE_ANON_KEY`: Public anon key for Supabase.
- `DATABASE_URL`: Connection string for Neon Database (if applicable).

Add additional environment variables as necessary based on your specific API setup.

## Scripts

- `npm run dev`: Runs the development server on [localhost:3000](http://localhost:3000).
- `npm run build`: Builds the project for production.
- `npm start`: Runs the production build.
- `npm run lint`: Lints the codebase using ESLint.

## Dependencies

**Core:**
- `next`: ^14.2.11
- `react` & `react-dom`: ^18 (React library)
- `tailwindcss`: ^3.4.1 (CSS framework)

**Data & APIs:**
- `@supabase/supabase-js`: ^2.45.4 (Supabase client)
- `@neondatabase/serverless`: ^0.9.5 (Neon Database integration)
- `axios`: ^1.7.7 (Promise-based HTTP client)

**Utilities:**
- `bcryptjs`: ^2.4.3 (Password hashing)
- `cookie`: ^0.6.0 (HTTP cookies)
- `js-cookie`: ^3.0.5 (Client-side cookie management)
- `date-fns`: ^4.1.0 (Date manipulation)

## Technologies Used

- **Next.js**: A React framework for server-rendered applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Supabase**: Open-source alternative to Firebase, used for database and authentication.
- **Neon Database**: Serverless PostgreSQL database.
- **ESLint**: For consistent code quality and style.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the creators of Next.js, Tailwind CSS, Supabase, and any other libraries and APIs used.
- Special thanks to [API Provider] for the nutrition data API.
