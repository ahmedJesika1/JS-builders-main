import { useState } from "react";
import { useSignupMutation } from "../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
const PHONE_REGEX = /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/; // BD format per schema

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    ok: false,
  });
  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const validate = () => {
    const e = {};

    // name
    if (!form.name?.trim()) e.name = "Please tell us your name";
    else if (form.name.trim().length < 3)
      e.name = "Minimum length of name is 3 characters";
    else if (form.name.trim().length > 50)
      e.name = "Maximum length of name is 50 characters";

    // email
    if (!form.email?.trim()) e.email = "Please provide your email address";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Please provide a valid email address";

    // phone (BD)
    if (!form.phone?.trim()) e.phone = "Phone number is required";
    else if (!PHONE_REGEX.test(form.phone.trim()))
      e.phone = "Please provide a valid phone number";

    // password
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    else if (form.password.length > 25)
      e.password = "Password must be at most 25 characters";

    // confirmPassword
    if (!form.confirmPassword)
      e.confirmPassword = "Please confirm your password";
    else if (form.confirmPassword !== form.password)
      e.confirmPassword = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ loading: true, message: "", ok: false });

    try {
      await signup(form).unwrap();

      setStatus({
        loading: false,
        message: "Account created successfully!",
        ok: true,
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});

      navigate("/login");
    } catch {
      setStatus({ loading: false, message: "Signup failed!", ok: false });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Create an Account
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Sign up to get started
        </p>

        {status.message && (
          <div
            className={`mt-4 rounded-lg border p-3 text-sm ${
              status.ok
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="mt-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className={`mt-1 w-full rounded-xl border p-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 ${
                errors.name ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className={`mt-1 w-full rounded-xl border p-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 ${
                errors.email ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              className={`mt-1 w-full rounded-xl border p-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 ${
                errors.phone ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                className={`mt-1 w-full rounded-xl border p-3 pr-12 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 ${
                  errors.password ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="********"
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute inset-y-0 right-3 my-auto text-sm text-gray-500 hover:text-gray-700"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showCPw ? "text" : "password"}
                className={`mt-1 w-full rounded-xl border p-3 pr-12 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 ${
                  errors.confirmPassword ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="********"
                value={form.confirmPassword}
                onChange={(e) => setField("confirmPassword", e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowCPw((s) => !s)}
                className="absolute inset-y-0 right-3 my-auto text-sm text-gray-500 hover:text-gray-700"
                aria-label={showCPw ? "Hide password" : "Show password"}
              >
                {showCPw ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            onClick={onSubmit}
            className="w-full rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 py-3 text-white font-medium shadow hover:opacity-90 disabled:opacity-60 transition-all duration-200"
            disabled={status.loading}
          >
            {status.loading ? "Creating account..." : "Create account"}
          </button>
          <p className="text-xs text-gray-500 text-center mt-4">
            Already have an account?
            <Link to="/login" className="underline cursor-pointer">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
