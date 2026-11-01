import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/signup/Logo";
import PageHeader from "../components/signup/PageHeader";
import TextInput from "../components/signup/TextInput";
import PasswordInput from "../components/signup/PasswordInput";
import SubmitButton from "../components/signup/SubmitButton";
import { toast } from "react-toastify";

import api from "../services/api";


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
      const response = await api.post("auth/login", {
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
      //extract token, user object and fallback properties
 const token = response.data.token || response.data.accessToken;
 const user =
 response.data.user || response.data.userData || response.data;
 //extract role
 const role =
 user?.role ||
 response.data?.role ||
 (user?.isAdmin ? "admin" : "guest");
 //save to localstorage
 if (token) localStorage.setItem("token", token);
 if (user) localStorage.setItem("user", JSON.stringify(user));
 localStorage.setItem("role", role);


      setForm({
        email: "",
        password: "",
      });
      //Redirect based on role
 const normalizedRole = String(role).toLowerCase();
 console.log("Detected role", normalizedRole);
 if (normalizedRole === "admin") {
 navigate("/admin", { replace: true });
 } else {
 navigate("/dashboard", { replace: true });
 }

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