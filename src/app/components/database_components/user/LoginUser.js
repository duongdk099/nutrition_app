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
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      {success && <p style={{ color: "green" }}>{success}</p>} {/* Display success message */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginUser;