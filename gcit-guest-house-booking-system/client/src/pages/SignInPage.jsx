import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/signup/Logo";
import PageHeader from "../components/signup/PageHeader";
import TextInput from "../components/signup/TextInput";
import PasswordInput from "../components/signup/PasswordInput";
import SubmitButton from "../components/signup/SubmitButton";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/auth/login`;

export default function SignInPage() {
  const navigate = useNavigate(); // FIXED: this line was missing

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      const message = "Email and password are required.";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(API_URL, {
        email: form.email,
        password: form.password,
      });

      console.log("Backend Response:", response.data);

      //   Subtask 2: Temporarily storing in local storage for now
      localStorage.setItem("token", response.data.token);

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      toast.success("Login successful!");

      setForm({
        email: "",
        password: "",
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);

      const message =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : null) ||
        "Could not reach the server. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <Logo />
        <PageHeader
          title="Login to Your Account"
          subtitle="Sign in to manage your room bookings and service requests."
        />

        <form className="signin-card" onSubmit={handleSubmit}>
          <TextInput
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <PasswordInput
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <SubmitButton
            label={loading ? "Logging in..." : "Login"}
            disabled={loading}
          />
        </form>
        {error && <p className="error-message"> {error} </p>}
        <p className="signup-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}