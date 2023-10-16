import { useEffect, useState } from "react";
import Styles from "./Form.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const USER_TEMPLATE = {
  username: "",
  password: "",
  about_user: "",
};

export default function Register() {
  const navigate = useNavigate();

  const location = useLocation();
  const [msg, setMsg] = useState();

  useEffect(() => {
    setMsg(location.state);
  }, [location.state]);

  const [userData, setUserData] = useState(USER_TEMPLATE);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function handleRegister(data) {
    if (data.message === "Success") {
      setUserData(USER_TEMPLATE);
      navigate("/login", { state: "Successfully registered." });
    } else {
      console.log(data.message);
      navigate("/register", { state: data.message });
    }
  }

  function fetchRegisterNewUser(callback) {
    fetch(`http://127.0.0.1:5000/auth/register`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (userData.username && userData.password && userData.about_user) {
      setMsg("");
      fetchRegisterNewUser(handleRegister);
    } else {
      navigate("/register", { state: "All fields are required." });
    }
  }

  return (
    <>
      <div className={Styles.wrapper}>
        <div className="heading">Register</div>
        <p className="warning-msg">{msg}</p>
        <div className={Styles.formWrapper}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={Styles.formItems}>
              <label>
                <span>Username:</span>
              </label>
              <input
                name="username"
                value={userData.username}
                onChange={(e) => handleChange(e)}
              />
              <label>
                <span>Password:</span>
              </label>
              <input
                name="password"
                value={userData.password}
                onChange={(e) => handleChange(e)}
              />
              <label>
                <span>Something about you:</span>
              </label>
              <textarea
                name="about_user"
                value={userData.about_user}
                onChange={(e) => handleChange(e)}
              />
              <div className={Styles.formBtns}>
                <button className={Styles.btn} type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
