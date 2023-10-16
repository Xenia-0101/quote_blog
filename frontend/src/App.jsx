import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Quotes from "./pages/Quotes";
import NewQuote from "./pages/FormNewQuote";
import Login from "./pages/FormLogin";
import Register from "./pages/FormRegister";
import Profile from "./pages/Profile";
import HeaderComponent from "./components/HeaderComponent";
import Styles from "./App.module.css";
import { useAuth } from "./hooks/AuthContext";
import FormEditAboutUser from "./pages/FormEditAboutUser";

function App() {
  const { removeToken, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  function logout() {
    removeToken();
    navigate("/login");
  }
  return (
    <>
      <div className={Styles.appWrapper}>
        <div className={Styles.headerWrapper}>
          <HeaderComponent>
          <Link to="/">Home</Link>
            {isAuthenticated && <Link to="/quotes">Quotes</Link>}
            {isAuthenticated && <Link to="/profile">Profile</Link>}
            {!isAuthenticated && <Link to="/login">Login</Link>}
            {!isAuthenticated && <Link to="/register">Register</Link>}
            {isAuthenticated && <button onClick={logout}>Logout</button>}
          </HeaderComponent>
        </div>

        <div className={Styles.bodyWrapper}>
          <Routes>
          <Route path="/" element={<Home/>} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/create-new" element={<NewQuote />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit/about-user" element={<FormEditAboutUser />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
