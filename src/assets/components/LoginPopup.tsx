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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4">
      <div className="relative bg-background border border-border rounded-3xl shadow-2xl w-full max-w-lg mx-auto max-h-[95vh] overflow-hidden">
        <div className="max-h-[95vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Tabs */}
          <div className="flex bg-muted/50 rounded-t-3xl border-b border-border">
            <button
              onClick={() => setIsLoginTab(true)}
              className={`flex-1 py-5 px-6 font-semibold transition-all duration-300 rounded-tl-3xl relative overflow-hidden ${
                isLoginTab 
                  ? "bg-primary text-primary-foreground shadow-lg" 
                  : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              <span className="relative z-10">Sign In</span>
              {isLoginTab && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90"></div>
              )}
            </button>
            <button
              onClick={() => setIsLoginTab(false)}
              className={`flex-1 py-5 px-6 font-semibold transition-all duration-300 rounded-tr-3xl relative overflow-hidden ${
                !isLoginTab 
                  ? "bg-primary text-primary-foreground shadow-lg" 
                  : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              <span className="relative z-10">Sign Up</span>
              {!isLoginTab && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90"></div>
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
          {isLoginTab ? (
            // Login Form
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Username
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    name="username"
                    value={loginInput.username}
                    onChange={(e) => handleInput(e, "login")}
                    className="w-full pl-12 pr-4 py-4 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => handleInput(e, "login")}
                    className="w-full pl-12 pr-14 py-4 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-primary hover:text-primary/80 text-sm transition-colors font-medium"
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          ) : (
            // Register Form
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Username
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    name="username"
                    value={registerInput.username}
                    onChange={(e) => handleInput(e, "register")}
                    className="w-full pl-12 pr-4 py-4 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="text-xs pl-1">
                  <span className={`flex items-center gap-1 ${usernameValid ? "text-green-500" : "text-destructive"}`}>
                    {usernameValid ? "✓" : "✗"} Only characters allowed
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={registerInput.email}
                    onChange={(e) => handleInput(e, "register")}
                    className="w-full pl-12 pr-4 py-4 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="text-xs pl-1">
                  <span className={`flex items-center gap-1 ${emailValid ? "text-green-500" : "text-destructive"}`}>
                    {emailValid ? "✓" : "✗"} Valid email format
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={registerInput.password}
                    onChange={(e) => handleInput(e, "register")}
                    className="w-full pl-12 pr-14 py-4 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="space-y-1 text-xs pl-1">
                  <div className={`flex items-center gap-1 ${passwordLengthValid ? "text-green-500" : "text-destructive"}`}>
                    {passwordLengthValid ? "✓" : "✗"} At least 8 characters
                  </div>
                  <div className={`flex items-center gap-1 ${passwordUpperCaseValid ? "text-green-500" : "text-destructive"}`}>
                    {passwordUpperCaseValid ? "✓" : "✗"} At least 1 uppercase letter
                  </div>
                  <div className={`flex items-center gap-1 ${passwordLowerCaseValid ? "text-green-500" : "text-destructive"}`}>
                    {passwordLowerCaseValid ? "✓" : "✗"} At least 1 lowercase letter
                  </div>
                  <div className={`flex items-center gap-1 ${passwordDigitValid ? "text-green-500" : "text-destructive"}`}>
                    {passwordDigitValid ? "✓" : "✗"} At least 1 digit
                  </div>
                  <div className={`flex items-center gap-1 ${passwordSpecialCharValid ? "text-green-500" : "text-destructive"}`}>
                    {passwordSpecialCharValid ? "✓" : "✗"} At least 1 special character
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Repeat Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    name="repeatPassword"
                    value={registerInput.repeatPassword}
                    onChange={(e) => handleInput(e, "register")}
                    className="w-full pl-12 pr-14 py-4 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="Repeat your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showRepeatPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="text-xs pl-1">
                  <span className={`flex items-center gap-1 ${repeatPasswordValid ? "text-green-500" : "text-destructive"}`}>
                    {repeatPasswordValid ? "✓" : "✗"} Passwords match
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Sign Up
              </button>
            </form>
          )}
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background border border-border rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Forgot Password</h3>
              <button
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotInput({ email: "", password: "", code: "", showCodeInput: false });
                }}
                className="text-muted-foreground hover:text-foreground p-2 hover:bg-muted rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {!forgotInput.showCodeInput ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={forgotInput.email}
                    onChange={(e) => handleInput(e, "forgot")}
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Current Password</label>
                  <input
                    type="password"
                    name="password"
                    value={forgotInput.password}
                    onChange={(e) => handleInput(e, "forgot")}
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter your current password"
                  />
                </div>
                <button
                  onClick={handleForgotPassword}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                >
                  Send Code
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <p className="text-muted-foreground text-sm">Enter the code sent to your email:</p>
                <input
                  type="text"
                  name="code"
                  value={forgotInput.code}
                  onChange={(e) => handleInput(e, "forgot")}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter verification code"
                />
                <button
                  onClick={handleForgotPassword}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
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