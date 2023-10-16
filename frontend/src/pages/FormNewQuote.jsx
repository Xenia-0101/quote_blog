import { useEffect, useState } from "react";
import Styles from "./Form.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

const QUOTE_TEMPLATE = {
  author: "",
  text: "",
  user_id: "",
};

export default function NewQuote() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [msg, setMsg] = useState();

  useEffect(() => {
    setMsg(location.state);
  }, [location.state]);

  const [quoteData, setQuoteData] = useState(QUOTE_TEMPLATE);

  function handleChange(e) {
    const { name, value } = e.target;
    setQuoteData((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function handleQuoteData(data) {
    if (data.message === "Success") {
      navigate("/quotes");
    } else {
      navigate("/login", { state: data.message });
    }
  }

  function createNewQuote(callback) {
    fetch("http://127.0.0.1:5000/quotes/", {
      method: "POST",
      body: JSON.stringify(quoteData),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => console.log(error));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (quoteData.author && quoteData.text) {
      createNewQuote(handleQuoteData);
    } else {
      navigate("/create-new", { state: "All fields are required" });
    }
  }

  return (
    <>
      <div className={Styles.wrapper}>
        <div className="heading">New Quote</div>
        <p className="warning-msg">{msg}</p>
        <div className={Styles.formWrapper}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={Styles.formItems}>
              <label>
                <span>Author:</span>
              </label>
              <input
                name="author"
                value={quoteData.author}
                onChange={(e) => handleChange(e)}
              />

              <label>
                <span>Text:</span>
              </label>
              <textarea
                name="text"
                value={quoteData.text}
                onChange={(e) => handleChange(e)}
              />
              <div className={Styles.formBtns}>
                <button className={Styles.btn} type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
