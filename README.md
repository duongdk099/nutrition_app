# Nutrition Website

This is a **Next.js** and **Tailwind CSS** based project that provides a dynamic nutrition information platform. The application allows users to explore nutrition data, manage user sessions, and access various features with the help of `Neon` and other APIs.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Project Structure](#project-structure)
- [Database Structure](#database-structure)
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

## Database Structure
The database consists of three primary tables:

1. **👤 Users**
2. **🍛 Meals**
3. **🍲 Meal Items**

Below, we'll describe how these tables relate to one another, with the relationships defined by the 🔑 foreign keys.

### 📋 Tables Overview

#### 1. **👤 Users Table**

- **🔑 Primary Key**: `🆔 user_id`
- **Attributes**: 
  - `👤 username`: The name of the user.
  - `📧 email`: The unique email address of the user.
  - `🔒 password_hash`: The hashed password for the user's account.

#### 2. **🍛 Meals Table**

- **🔑 Primary Key**: `🆔 meal_id`
- **🔗 Foreign Key**: `🆔 user_id` → **references** `👤 users(user_id)`
- **Attributes**: 
  - `🔢 meal_number`: The meal number (e.g., 1 for breakfast, 2 for lunch).
  - `⏰ meal_time`: The time at which the meal was eaten.
  - `📅 log_date`: The date of the meal.
  - `🕒 createdAt`: The timestamp when the meal entry was created (automatically generated).

#### 3. **🍲 Meal Items Table**

- **🔑 Primary Key**: `🆔 meal_item_id`
- **🔗 Foreign Key**: `🆔 meal_id` → **references** `🍛 meals(meal_id)`
- **Attributes**: 
  - `🍽️ food_name`: The name of the food item.
  - `⚖️ food_quantity`: The quantity of the food item in grams.
  - `🔥 food_calories`: The number of calories in the food item.
  - `💪 food_protein`: The amount of protein in grams.
  - `🍞 food_carb`: The amount of carbohydrates in grams.
  - `🌾 food_fiber`: The amount of fiber in grams.

### 🔗 Relationships

#### 1. **👤 Users ➔ 🍛 Meals**

- **1️⃣ One-to-Many**: A `👤 user` can log multiple `🍛 meals`.
- Represented by: **`🆔 user_id`** in the `🍛 meals` table, which references the **primary key** of the `👤 users` table.

#### 2. **🍛 Meals ➔ 🍲 Meal Items**

- **1️⃣ One-to-Many**: A `🍛 meal` can have multiple `🍲 meal_items`.
- Represented by: **`🆔 meal_id`** in the `🍲 meal_items` table, which references the **primary key** of the `🍛 meals` table.

### 🗺️ Diagram Representation

```
 👤 users                          🍛 meals                            🍲 meal_items
+------------------+       +--------------------+       +-------------------------+
| 🆔 user_id (PK)   |       | 🆔 meal_id (PK)    |       | 🆔 meal_item_id (PK)    |
| 👤 username       |<------| 🆔 user_id (FK)   |       | 🆔 meal_id (FK)         |
| 📧 email (UNIQUE) |       | 🔢 meal_number    |<------| 🍽️ food_name            |
| 🔒 password_hash  |       | ⏰ meal_time      |       | ⚖️ food_quantity        |
+------------------+       | 📅 log_date       |       | 🔥 food_calories        |
                       | 🕒 createdAt       |       | 💪 food_protein          |
                       +--------------------+       | 🍞 food_carb             |
                                                    | 🌾 food_fiber            |
                                                    +-------------------------+
```

- **🔑 Primary Keys** are marked as `(PK)`.
- **🔗 Foreign Keys** are marked as `(FK)`.
- The arrows (➔) indicate the relationships between the tables:
  - `🆔 user_id` in `🍛 meals` is a **foreign key** pointing to `🆔 user_id` in `👤 users`.
  - `🆔 meal_id` in `🍲 meal_items` is a **foreign key** pointing to `🆔 meal_id` in `🍛 meals`.

### 📊 Summary

- A **👤 user** can log multiple **🍛 meals** (e.g., 🍳 breakfast, 🥗 lunch).
- Each **🍛 meal** can consist of multiple **🍲 meal items** (e.g., different 🍔 foods eaten during that meal).
- The structure captures a **1️⃣ one-to-many** relationship between users and meals, and between meals and meal items.

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
