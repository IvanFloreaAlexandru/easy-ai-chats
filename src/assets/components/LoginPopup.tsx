import { useState, useEffect } from "react";
import { X, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPopup = ({ isOpen, onClose }: LoginPopupProps) => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Login state
  const [loginInput, setLoginInput] = useState({ username: "", password: "" });

  // Register state
  const [registerInput, setRegisterInput] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  // Forgot password state
  const [forgotInput, setForgotInput] = useState({
    email: "",
    password: "",
    code: "",
    showCodeInput: false,
  });

  // Validation states
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);
  const [passwordUpperCaseValid, setPasswordUpperCaseValid] = useState(false);
  const [passwordLowerCaseValid, setPasswordLowerCaseValid] = useState(false);
  const [passwordDigitValid, setPasswordDigitValid] = useState(false);
  const [passwordSpecialCharValid, setPasswordSpecialCharValid] = useState(false);
  const [repeatPasswordValid, setRepeatPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  // ---------------- Handlers ----------------

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (loginInput.username !== "" && loginInput.password !== "") {
        console.log("Login attempt:", loginInput);
        alert("Login successful! (Demo mode)");
        setLoginInput({ username: "", password: "" });
        onClose();
      } else {
        throw new Error("Please provide valid input");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("The account details are incorrect!");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        registerInput.username !== "" &&
        registerInput.email !== "" &&
        registerInput.password !== "" &&
        registerInput.repeatPassword !== "" &&
        registerInput.password === registerInput.repeatPassword &&
        emailValid &&
        usernameValid &&
        passwordLengthValid &&
        passwordUpperCaseValid &&
        passwordLowerCaseValid &&
        passwordDigitValid &&
        passwordSpecialCharValid
      ) {
        console.log("Register attempt:", {
          username: registerInput.username,
          email: registerInput.email,
          password: registerInput.password,
          registration_date: new Date().toISOString(),
        });

        alert("Account registered successfully! (Demo mode)");

        setRegisterInput({
          username: "",
          email: "",
          password: "",
          repeatPassword: "",
        });
        onClose();
      } else {
        alert("Please provide valid input and meet all requirements");
      }
    } catch (error) {
      alert("Error registering the account!");
    }
  };

  const handleForgotPassword = async () => {
    try {
      if (!forgotInput.showCodeInput) {
        if (forgotInput.email && forgotInput.password) {
          console.log("Forgot password verification:", {
            email: forgotInput.email,
            password: forgotInput.password,
          });
          setForgotInput((prev) => ({ ...prev, showCodeInput: true }));
          alert("Code sent to your email! (Demo mode)");
        } else {
          alert("Please enter both email and password");
        }
      } else {
        if (forgotInput.code) {
          console.log("Code verification:", forgotInput.code);
          alert("Password reset successful! (Demo mode)");
          setShowForgotModal(false);
          setForgotInput({ email: "", password: "", code: "", showCodeInput: false });
        } else {
          alert("Please enter the code");
        }
      }
    } catch (error) {
      alert("Error processing forgot password request!");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const { name, value } = e.target;
    if (type === "login") {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    } else if (type === "register") {
      setRegisterInput((prev) => ({ ...prev, [name]: value }));
    } else if (type === "forgot") {
      setForgotInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ---------------- Effects ----------------
  useEffect(() => {
    setUsernameValid(/^[a-zA-Z]*$/.test(registerInput.username) && registerInput.username !== "");
    setPasswordLengthValid(registerInput.password.length >= 8);
    setPasswordUpperCaseValid(/[A-Z]/.test(registerInput.password));
    setPasswordLowerCaseValid(/[a-z]/.test(registerInput.password));
    setPasswordDigitValid(/\d/.test(registerInput.password));
    setPasswordSpecialCharValid(/[!@#$%^&*()_+\-=[\]{};:\\|,.<>/?]/.test(registerInput.password));
    setRepeatPasswordValid(
      registerInput.password === registerInput.repeatPassword && registerInput.repeatPassword !== ""
    );
    setEmailValid(/\S+@\S+\.\S+/.test(registerInput.email));
  }, [registerInput]);

  useEffect(() => {
    if (!isOpen) {
      setIsLoginTab(true);
      setShowPassword(false);
      setShowRepeatPassword(false);
      setShowForgotModal(false);
      setLoginInput({ username: "", password: "" });
      setRegisterInput({ username: "", email: "", password: "", repeatPassword: "" });
      setForgotInput({ email: "", password: "", code: "", showCodeInput: false });
    }
  }, [isOpen]);

  // ---------------- UI ----------------
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Left side - Chess content background overlay */}
      <div className="flex-1 bg-black/20 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none" />
      
      {/* Right side - Login popup */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 lg:p-8">
        <div className="relative bg-slate-900/95 border border-blue-500/30 rounded-2xl shadow-2xl w-full max-w-md max-h-[95vh] overflow-hidden backdrop-blur-xl">
          <div className="max-h-[95vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-blue-200 hover:text-white hover:bg-blue-600/30 rounded-full transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Tabs */}
          <div className="flex bg-slate-800/50 rounded-t-2xl border-b border-blue-500/20">
            <button
              onClick={() => setIsLoginTab(true)}
              className={`flex-1 py-4 px-4 font-semibold transition-all duration-300 rounded-tl-2xl relative overflow-hidden ${
                isLoginTab
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "bg-transparent text-blue-200 hover:text-white hover:bg-blue-600/20"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLoginTab(false)}
              className={`flex-1 py-4 px-4 font-semibold transition-all duration-300 rounded-tr-2xl relative overflow-hidden ${
                !isLoginTab
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "bg-transparent text-blue-200 hover:text-white hover:bg-blue-600/20"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isLoginTab ? (
              /* -------- LOGIN -------- */
              <form onSubmit={handleLoginSubmit} className="space-y-5 sm:space-y-6">
                 {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      type="text"
                      name="username"
                      value={loginInput.username}
                      onChange={(e) => handleInput(e, "login")}
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition backdrop-blur-sm"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginInput.password}
                      onChange={(e) => handleInput(e, "login")}
                      className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition backdrop-blur-sm"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition transform hover:scale-[1.02] shadow-lg shadow-blue-500/25"
                >
                  Sign In
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-blue-300 hover:text-blue-200 text-sm font-medium transition"
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
            ) : (
              /* -------- REGISTER -------- */
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      type="text"
                      name="username"
                      value={registerInput.username}
                      onChange={(e) => handleInput(e, "register")}
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition backdrop-blur-sm"
                      placeholder="Enter your username"
                    />
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      usernameValid ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {usernameValid ? "✓ Only characters allowed" : "✗ Only characters allowed"}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      type="email"
                      name="email"
                      value={registerInput.email}
                      onChange={(e) => handleInput(e, "register")}
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition backdrop-blur-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      emailValid ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {emailValid ? "✓ Valid email format" : "✗ Invalid email"}
                  </p>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={registerInput.password}
                      onChange={(e) => handleInput(e, "register")}
                      className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition backdrop-blur-sm"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="mt-2 space-y-1 text-xs">
                    <p className={passwordLengthValid ? "text-green-400" : "text-red-400"}>
                      {passwordLengthValid ? "✓" : "✗"} At least 8 characters
                    </p>
                    <p className={passwordUpperCaseValid ? "text-green-400" : "text-red-400"}>
                      {passwordUpperCaseValid ? "✓" : "✗"} At least 1 uppercase letter
                    </p>
                    <p className={passwordLowerCaseValid ? "text-green-400" : "text-red-400"}>
                      {passwordLowerCaseValid ? "✓" : "✗"} At least 1 lowercase letter
                    </p>
                    <p className={passwordDigitValid ? "text-green-400" : "text-red-400"}>
                      {passwordDigitValid ? "✓" : "✗"} At least 1 digit
                    </p>
                    <p
                      className={passwordSpecialCharValid ? "text-green-400" : "text-red-400"}
                    >
                      {passwordSpecialCharValid ? "✓" : "✗"} At least 1 special character
                    </p>
                  </div>
                </div>

                {/* Repeat Password */}
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">Repeat Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      type={showRepeatPassword ? "text" : "password"}
                      name="repeatPassword"
                      value={registerInput.repeatPassword}
                      onChange={(e) => handleInput(e, "register")}
                      className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition backdrop-blur-sm"
                      placeholder="Repeat your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition"
                    >
                      {showRepeatPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      repeatPasswordValid ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {repeatPasswordValid ? "✓ Passwords match" : "✗ Passwords do not match"}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition transform hover:scale-[1.02] shadow-lg shadow-blue-500/25"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-slate-900/95 border border-blue-500/30 rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-blue-100">Forgot Password</h3>
              <button
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotInput({ email: "", password: "", code: "", showCodeInput: false });
                }}
                className="text-blue-300 hover:text-white p-2 hover:bg-blue-600/30 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {!forgotInput.showCodeInput ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-100">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={forgotInput.email}
                    onChange={(e) => handleInput(e, "forgot")}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-200/60 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-100">Current Password</label>
                  <input
                    type="password"
                    name="password"
                    value={forgotInput.password}
                    onChange={(e) => handleInput(e, "forgot")}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-200/60 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all backdrop-blur-sm"
                    placeholder="Enter your current password"
                  />
                </div>
                <button
                  onClick={handleForgotPassword}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-blue-500/25"
                >
                  Send Code
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <p className="text-blue-200 text-sm">Enter the code sent to your email:</p>
                <input
                  type="text"
                  name="code"
                  value={forgotInput.code}
                  onChange={(e) => handleInput(e, "forgot")}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-xl text-white placeholder-blue-200/60 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all backdrop-blur-sm"
                  placeholder="Enter verification code"
                />
                <button
                  onClick={handleForgotPassword}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-blue-500/25"
                >
                  Verify Code
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPopup;