import Background from "../constants/background/background.tsx";
import Navbar from "../components/NavbarNoLogin.tsx";
import ChessSlider from "../components/ChessSlider"; // Importă componenta slider

const LoginPage = () => {
  return (
    <div className="login-content">
      <ChessSlider 
        Background={Background}
        Navbar={Navbar}
      />
    </div>
  );
};

export default LoginPage;