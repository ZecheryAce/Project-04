import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import "../styles/Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username =
        "Invalid username. Use only letters, numbers, and underscores.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!/^(?=.*\d).{8,}$/.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters and contain a number.";
    }

    if (!repeatPassword) {
      newErrors.repeatPassword = "Please repeat your password.";
    } else if (password !== repeatPassword) {
      newErrors.repeatPassword = "The two passwords do not match.";
    }

    if (!agreed) {
      newErrors.agreed = "You must agree to the Terms and Conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      await API.post("/auth/register", { username, password });
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setErrors({
        server: err.response?.data?.message || "Registration failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">🪐 Planets QA</h1>
        <h2 className="register-heading">Register User</h2>

        {errors.server && <p className="register-error">{errors.server}</p>}
        {success && <p className="register-success">{success}</p>}

        {/* Username */}
        <div className="register-field-group">
          <input
            className="register-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prev) => ({ ...prev, username: "" }));
            }}
          />
          {errors.username && (
            <p className="register-field-error">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div className="register-field-group">
          <input
            className="register-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
          />
          {errors.password && (
            <p className="register-field-error">{errors.password}</p>
          )}
        </div>

        {/* Repeat Password */}
        <div className="register-field-group">
          <input
            className="register-input"
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => {
              setRepeatPassword(e.target.value);
              setErrors((prev) => ({ ...prev, repeatPassword: "" }));
            }}
          />
          {errors.repeatPassword && (
            <p className="register-field-error">{errors.repeatPassword}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="register-checkbox-group">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              setErrors((prev) => ({ ...prev, agreed: "" }));
            }}
            style={{ accentColor: "#7c3aed" }}
          />
          <label
            htmlFor="terms"
            className={`register-checkbox-label ${errors.agreed ? "error" : ""}`}
          >
            I agree to the Terms and Conditions and Privacy Policy
          </label>
        </div>
        {errors.agreed && (
          <p className="register-field-error">{errors.agreed}</p>
        )}

        <button
          className="register-button"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="register-login-text">
          Already have an Account?{" "}
          <Link to="/" className="register-link">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
