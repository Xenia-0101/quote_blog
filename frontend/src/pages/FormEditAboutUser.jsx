import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Styles from "./Form.module.css";
import { useAuth } from "../hooks/AuthContext";

export default function FormEditAboutUser() {
  const { token, setRefresher, currentUser } = useAuth();
  const {userId} = currentUser
  const navigate = useNavigate();
  const location = useLocation();

  const [newAbout, setNewAbout] = useState({ about_user: "" });

  useEffect(() => {
    setRefresher(Math.random());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setNewAbout((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function handleEdit() {

  }

  function fetchEditAboutUser() {
    fetch(`http://127.0.0.1:5000/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(newAbout),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.ok) navigate("/profile", {state: "Description updated"})
        else {navigate("/profile", {state: "Something went wrong"})}
      })
  }

  function handleSubmit(e) {

    e.preventDefault(handleEdit)
    fetchEditAboutUser();
  }

  return (
    <>
      <div className={Styles.wrapper}>
        <div style={{ fontSize: "2rem" }} className="heading">
          Edit user description
        </div>
        <div className={Styles.formWrapper}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={Styles.formItems}>
              <label>
                <span></span>
              </label>
              <textarea
                placeholder="Write something about yourself..."
                style={{ width: "20rem", height: "8rem" }}
                name="about_user"
                value={newAbout.about_user}
                onChange={(e) => handleChange(e)}
              />

              <div className={Styles.formBtns}>
                <button className={Styles.btn} type="submit">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
