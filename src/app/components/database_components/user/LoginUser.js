import { useState } from "react";
import { login } from "../../../services/users"; // Import the login function from your database file

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
      // Call the login function with the email and plain password (not hashed)
      const user = await login(email, password);

      if (!user) {
        setError("Invalid email or password.");
      } else {
        // If login is successful
        setSuccess("Login successful!");
        window.location.href = "/profile"; // This performs a full page reload and redirects to /profile
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