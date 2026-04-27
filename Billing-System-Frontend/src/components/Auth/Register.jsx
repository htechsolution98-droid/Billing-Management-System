import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance.js";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCircle,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
  Shield,
  Briefcase,
  Store,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "nuser",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Role options with icons
  const roleOptions = [
    { value: "nuser", label: "Normal User", icon: UserCircle, color: "text-blue-600", bgColor: "bg-blue-50" },
    { value: "distributor", label: "Distributor", icon: Briefcase, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    // { value: "superadmin", label: "Super Admin", icon: Shield, color: "text-violet-600", bgColor: "bg-violet-50" },
  ];

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    if (registerError) {
      setRegisterError("");
    }
    // Calculate password strength
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  // Get strength label and color
  const getStrengthDetails = () => {
    if (passwordStrength === 0) return { label: "", color: "", width: "0%" };
    if (passwordStrength <= 2) return { label: "Weak", color: "bg-red-500", textColor: "text-red-500", width: "33%" };
    if (passwordStrength <= 4) return { label: "Medium", color: "bg-yellow-500", textColor: "text-yellow-500", width: "66%" };
    return { label: "Strong", color: "bg-green-500", textColor: "text-green-500", width: "100%" };
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setRegisterError("");

    try {
      const response = await axiosInstance.post(
        "/registerapi/createregister",
        formData,
      );

      console.log("Register Success:", response.data);

      // Show success and redirect
      setTimeout(() => {
        navigate("/Login");
      }, 1500);
    } catch (error) {
      console.error(error);
      setRegisterError(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const strengthDetails = getStrengthDetails();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-violet-50 to-purple-100 p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Register Card */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Top Gradient Bar */}
        <div className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>

        <div className="p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            {/* System Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg shadow-violet-500/30 mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Create New Account
            </h1>
            <p className="text-gray-500 text-sm">Join our Billing Management System</p>
          </div>

          {/* Error Message */}
          {registerError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{registerError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.name
                      ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                      : "border-gray-200 focus:ring-violet-200 focus:border-violet-400"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.email
                      ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                      : "border-gray-200 focus:ring-violet-200 focus:border-violet-400"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.password
                      ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                      : "border-gray-200 focus:ring-violet-200 focus:border-violet-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password}
                </p>
              )}

              {/* Password Strength Indicator */}
              {/* {formData.password && (
                <div className="mt-3 animate-in fade-in">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Password Strength</span>
                    <span className={`text-xs font-medium ${strengthDetails.textColor}`}>
                      {strengthDetails.label}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${strengthDetails.color}`}
                      style={{ width: strengthDetails.width }}
                    ></div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className={`text-xs ${formData.password.length >= 6 ? "text-green-500" : "text-gray-400"}`}>
                      ✓ 6+ characters
                    </span>
                    <span className={`text-xs ${/[A-Z]/.test(formData.password) ? "text-green-500" : "text-gray-400"}`}>
                      ✓ Uppercase
                    </span>
                    <span className={`text-xs ${/[0-9]/.test(formData.password) ? "text-green-500" : "text-gray-400"}`}>
                      ✓ Number
                    </span>
                    <span className={`text-xs ${/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500" : "text-gray-400"}`}>
                      ✓ Special char
                    </span>
                  </div>
                </div>
              )} */}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roleOptions.map((role) => {
                  const Icon = role.icon;
                  const isSelected = formData.role === role.value;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => handleChange({ target: { name: "role", value: role.value } })}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? `border-violet-500 ${role.bgColor}`
                          : "border-gray-200 hover:border-violet-200 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${role.color}`} />
                      <span className={`text-xs font-medium ${isSelected ? role.color : "text-gray-600"}`}>
                        {role.label}
                      </span>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-violet-500 absolute top-1 right-1" />
                      )}
                    </button>
                  );
                })}
              </div>
              {errors.role && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.role}
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/Login"
                className="font-semibold text-violet-600 hover:text-violet-700 transition-colors"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50/80 border-t border-gray-100">
          <p className="text-center text-xs text-gray-500">
            © 2026 Billing Management System. All rights reserved.
          </p>
        </div>
      </div>

      {/* CSS for blob animation */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Register;
