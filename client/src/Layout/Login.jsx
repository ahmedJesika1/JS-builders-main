import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLoginApiMutation } from "../redux/features/auth/authApi";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    ok: false,
  });
  const [loginApi] = useLoginApiMutation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const validate = () => {
    const e = {};
    // email
    if (!form.email?.trim()) e.email = "Please provide your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Please provide a valid email address";

    // password
    if (!form.password) e.password = "Password is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      emailOrPhone: form.email, // server expects this key
      password: form.password,
    };

    const result = await loginApi(payload);

    // Correct path
    const userData = result.data.data.user;
    const token = result.data.data.token;

    login(userData, token);

    setStatus({ loading: true, message: "", ok: false });

    // Fake API call
    setTimeout(() => {
      setStatus({
        loading: false,
        message: "Logged in successfully! (Demo mode)",
        ok: true,
      });
      setForm({ email: "", password: "" });
      setErrors({});
    }, 1500);

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Login to continue
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

        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
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

          <button
            type="submit"
            disabled={status.loading}
            className="w-full rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 py-3 text-white font-medium shadow hover:opacity-90 disabled:opacity-60 transition-all duration-200"
          >
            {status.loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/signUp" className="underline cursor-pointer">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
