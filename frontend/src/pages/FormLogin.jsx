import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Styles from "./Form.module.css";
import { useAuth } from "../hooks/AuthContext";

const LOGIN_TEMPLATE = {
  username: "",
  password: "",
};

export default function Login() {
  const { handleToken, setRefresher } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(LOGIN_TEMPLATE);

  const [msg, setMsg] = useState();
  const location = useLocation();

  useEffect(() => {
    setMsg(location.state);
  }, [location.state]);

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function handleLogin(data) {
    console.log(data);
    if (data.message == "Success") {
      handleToken(data.access_token);
      setRefresher(Math.random())
      setLoginData(LOGIN_TEMPLATE);
      navigate("/quotes");
    } else {
      navigate("/login", { state: data.message });
    }
  }

  function loginUser(callback) {
    fetch("http://127.0.0.1:5000/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => console.log(error));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      loginUser(handleLogin);
    } else {
      setMsg("All fields are required");
    }
  }

  return (
    <>
      <div className={Styles.wrapper}>
        <div className="heading">Login</div>
        <p className="warning-msg">{msg}</p>
        <div className={Styles.formWrapper}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={Styles.formItems}>
              <label>
                <span>Username:</span>
              </label>
              <input
                name="username"
                value={loginData.username}
                onChange={(e) => handleChange(e)}
              />
              <label>
                <span>Password:</span>
              </label>
              <input
                name="password"
                value={loginData.password}
                onChange={(e) => handleChange(e)}
              />

              <div className={Styles.formBtns}>
                <button className={Styles.btn} type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
