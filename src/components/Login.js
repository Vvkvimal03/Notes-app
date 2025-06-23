import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      await login(data.email, data.password);
      navigate("/notes");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <LoginIcon className="text-white text-2xl" />
            </div>
            <Typography variant="h4" className="font-bold text-gray-800 mb-2">
              Welcome Back
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Sign in to access your notes
            </Typography>
          </div>

          {error && (
            <div className="mb-6">
              <Alert severity="error" className="rounded-lg" onClose={() => setError("")}>
                {error}
              </Alert>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    className="bg-gray-50/50 rounded-lg"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon className="text-gray-400" />
                        </InputAdornment>
                      ),
                      className: "rounded-lg",
                    }}
                    slotProps={{
                      input: {
                        className: "focus:border-teal-500 hover:border-teal-400 border-gray-300"
                      }
                    }}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    className="bg-gray-50/50 rounded-lg"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon className="text-gray-400" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      className: "rounded-lg",
                    }}
                    slotProps={{
                      input: {
                        className: "focus:border-teal-500 hover:border-teal-400 border-gray-300"
                      }
                    }}
                  />
                )}
              />
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={!isDirty || !isValid || loading}
              className="h-12 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:transform-none disabled:opacity-50 disabled:bg-gray-400 disabled:text-gray-200 normal-case text-base"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <CircularProgress size={20} className="text-white" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <LoginIcon />
                  <span>Sign In</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
            <Typography variant="body2" className="text-teal-800 font-medium mb-1">
              Demo Credentials:
            </Typography>
            <Typography variant="body2" className="text-teal-700">
              Email: user@example.com<br />
              Password: password123
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;