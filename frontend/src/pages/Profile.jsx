import { useAuth } from "../hooks/AuthContext";
import QuoteComponent from "../components/QuoteComponent";

import Styles from "./Quotes.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { currentUser, token, setRefresher } = useAuth();
  const navigate = useNavigate()
  
  // refreshes the current user
  useEffect(() => {
    setRefresher(Math.random());
  }, []);

  function callDelete(data) {
    if (data.message === "Success") {
      setRefresher(Math.random());
    } else {
      alert(data.message);
    }
  }

  function fetchDeleteQuote(callback, quoteId) {
    fetch(`http://127.0.0.1:5000/quotes/${quoteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => console.log(error));
  }

  function handleDelete(quoteId) {
    fetchDeleteQuote(callDelete, quoteId);
  }

  return (
    <>
      {currentUser && (
        <div className={Styles.homeWrapper}>
          <div className={Styles.heading}>
            <span>{currentUser.username}</span>
            <button>+ New</button>
          </div>
          <div className={Styles.subheading}>
            &#34;
            {currentUser.aboutUser}
            &#34;
            
            <button onClick={() => navigate("/edit/about-user")}>Edit</button>
            
          </div>

          {!currentUser ? (
            <span>Loading...</span>
          ) : (
            <div className={Styles.quotesWrapper}>
              {currentUser.quotes.map((value) => {
                return (
                  <QuoteComponent
                    key={value.id}
                    text={value.text}
                    author={value.author}
                    // user_id={value.user_id}
                    // editQuote={() => handleEdit(value.id)}
                    deleteQuote={() => handleDelete(value.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
