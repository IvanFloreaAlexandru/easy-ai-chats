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
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });

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

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (loginInput.username !== "" && loginInput.password !== "") {
        const formData = new FormData();
        formData.append("username", loginInput.username);
        formData.append("password", loginInput.password);

        // Simulare API call - înlocuiește cu API-ul tău real
        console.log("Login attempt:", loginInput);
        
        // Simulare răspuns succes
        alert("Login successful! (Demo mode)");
        
        // Reset form și închide popup
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
        // Simulare API call - înlocuiește cu API-ul tău real
        console.log("Register attempt:", {
          username: registerInput.username,
          email: registerInput.email,
          password: registerInput.password,
          registration_date: new Date().toISOString(),
        });
        
        alert("Account registered successfully! (Demo mode)");
        
        // Reset form și închide popup
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
        // Prima etapă - trimite email și password pentru verificare
        if (forgotInput.email && forgotInput.password) {
          console.log("Forgot password verification:", {
            email: forgotInput.email,
            password: forgotInput.password,
          });
          
          // Simulare verificare
          setForgotInput(prev => ({ ...prev, showCodeInput: true }));
          alert("Code sent to your email! (Demo mode)");
        } else {
          alert("Please enter both email and password");
        }
      } else {
        // A doua etapă - verifică codul
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

  // Validation effects
  useEffect(() => {
    setUsernameValid(
      /^[a-zA-Z]*$/.test(registerInput.username) && registerInput.username !== ""
    );
    setPasswordLengthValid(registerInput.password.length >= 8);
    setPasswordUpperCaseValid(/[A-Z]/.test(registerInput.password));
    setPasswordLowerCaseValid(/[a-z]/.test(registerInput.password));
    setPasswordDigitValid(/\d/.test(registerInput.password));
    setPasswordSpecialCharValid(
      /[!@#$%^&*()_+\-=[\]{};:\\|,.<>/?]/.test(registerInput.password)
    );
    setRepeatPasswordValid(
      registerInput.password === registerInput.repeatPassword &&
      registerInput.repeatPassword !== ""
    );
    setEmailValid(/\S+@\S+\.\S+/.test(registerInput.email));
  }, [registerInput]);

  // Reset states when popup closes
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tabs */}
        <div className="flex bg-gray-800 rounded-t-2xl">
          <button
            onClick={() => setIsLoginTab(true)}
            className={`flex-1 py-4 px-6 font-semibold transition-all rounded-tl-2xl ${
              isLoginTab 
                ? "bg-blue-600 text-white shadow-lg" 
                : "bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLoginTab(false)}
            className={`flex-1 py-4 px-6 font-semibold transition-all rounded-tr-2xl ${
              !isLoginTab 
                ? "bg-blue-600 text-white shadow-lg" 
                : "bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoginTab ? (
            // Login Form
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={loginInput.username}
                    onChange={(e) => handleInput(e, "login")}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => handleInput(e, "login")}
                    className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg"
              >
                Sign In
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          ) : (
            // Register Form
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={registerInput.username}
                    onChange={(e) => handleInput(e, "register")}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="mt-1 text-xs">
                  <span className={usernameValid ? "text-green-400" : "text-red-400"}>
                    {usernameValid ? "✓" : "✗"} Only characters allowed
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={registerInput.email}
                    onChange={(e) => handleInput(e, "register")}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-1 text-xs">
                  <span className={emailValid ? "text-green-400" : "text-red-400"}>
                    {emailValid ? "✓" : "✗"} Valid email format
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={registerInput.password}
                    onChange={(e) => handleInput(e, "register")}
                    className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="mt-1 space-y-1 text-xs">
                  <div className={passwordLengthValid ? "text-green-400" : "text-red-400"}>
                    {passwordLengthValid ? "✓" : "✗"} At least 8 characters
                  </div>
                  <div className={passwordUpperCaseValid ? "text-green-400" : "text-red-400"}>
                    {passwordUpperCaseValid ? "✓" : "✗"} At least 1 uppercase letter
                  </div>
                  <div className={passwordLowerCaseValid ? "text-green-400" : "text-red-400"}>
                    {passwordLowerCaseValid ? "✓" : "✗"} At least 1 lowercase letter
                  </div>
                  <div className={passwordDigitValid ? "text-green-400" : "text-red-400"}>
                    {passwordDigitValid ? "✓" : "✗"} At least 1 digit
                  </div>
                  <div className={passwordSpecialCharValid ? "text-green-400" : "text-red-400"}>
                    {passwordSpecialCharValid ? "✓" : "✗"} At least 1 special character
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Repeat Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    name="repeatPassword"
                    value={registerInput.repeatPassword}
                    onChange={(e) => handleInput(e, "register")}
                    className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Repeat your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                  >
                    {showRepeatPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="mt-1 text-xs">
                  <span className={repeatPasswordValid ? "text-green-400" : "text-red-400"}>
                    {repeatPasswordValid ? "✓" : "✗"} Passwords match
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-sm mx-4 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Forgot Password</h3>
              <button
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotInput({ email: "", password: "", code: "", showCodeInput: false });
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {!forgotInput.showCodeInput ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={forgotInput.email}
                    onChange={(e) => handleInput(e, "forgot")}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    name="password"
                    value={forgotInput.password}
                    onChange={(e) => handleInput(e, "forgot")}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your current password"
                  />
                </div>
                <button
                  onClick={handleForgotPassword}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                >
                  Send Code
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">Enter the code sent to your email:</p>
                <input
                  type="text"
                  name="code"
                  value={forgotInput.code}
                  onChange={(e) => handleInput(e, "forgot")}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter verification code"
                />
                <button
                  onClick={handleForgotPassword}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
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