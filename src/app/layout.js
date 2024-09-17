// app/layout.js
import './globals.css'; // Import global styles (Tailwind setup)
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Header with Navigation */}
        <header className="bg-green-500 text-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold">NutriLife</div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="hover:text-green-200">Home</Link>
                </li>
                <li>
                  <Link href="/recipes" className="hover:text-green-200">Recipes</Link>
                </li>
                <li>
                  <Link href="/food-logs" className="hover:text-green-200">Food Logs</Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-green-200">Profile</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2023 NutriLife. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}