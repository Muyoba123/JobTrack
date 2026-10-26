import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setValidationErrors({});

        try {
            await register(formData);

            navigate("/dashboard", { replace: true });
        } catch (err) {
            const responseData = err.response?.data;

            if (responseData?.errors) {
                setValidationErrors(responseData.errors);
                setError("Please correct the highlighted errors.");
            } else {
                setError(
                    responseData?.message ||
                    "Unable to create your account. Please try again."
                );
            }
        }
    }

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h1>Create Account</h1>

                <p className="subtitle">
                    Start tracking your job applications.
                </p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <label htmlFor="name">Full Name</label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                />

                {validationErrors.name && (
                    <p className="field-error">
                        {validationErrors.name[0]}
                    </p>
                )}

                <label htmlFor="register-email">
                    Email Address
                </label>

                <input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                />

                {validationErrors.email && (
                    <p className="field-error">
                        {validationErrors.email[0]}
                    </p>
                )}

                <label htmlFor="register-password">
                    Password
                </label>

                <input
                    id="register-password"
                    name="password"
                    type="password"
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={8}
                    required
                />

                {validationErrors.password && (
                    <p className="field-error">
                        {validationErrors.password[0]}
                    </p>
                )}

                <label htmlFor="password_confirmation">
                    Confirm Password
                </label>

                <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={8}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Register"}
                </button>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    );
}