import { useState } from "react";
import { login } from "../../../services/users"; // Import your login function
import Cookies from "js-cookie"; // Import js-cookie to manage cookies

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const [success, setSuccess] = useState(""); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      // Call the login function with the email and plain password
      const user = await login(email, password);

      if (!user) {
        setError("Invalid email or password.");
      } else {
        console.log(user);
        
        // If login is successful, set a cookie with user information or token
        Cookies.set("authToken", JSON.stringify(user), { expires: 7 }); // The token is stored for 7 days
        setSuccess("Login successful!");
        
        // Redirect to the profile page
        window.location.href = "/profile";
      }

      // Clear form inputs
      setEmail("");
      setPassword("");
    } catch (error) {
      // Display the error message if something goes wrong
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>} {/* Display success message */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
