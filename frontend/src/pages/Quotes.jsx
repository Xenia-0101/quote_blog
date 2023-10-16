import Styles from "./Quotes.module.css";
import QuoteComponent from "../components/QuoteComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export default function Home() {
  const {token, setRefresher} = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllQuotes(handleAllQuotes);
    setRefresher(Math.random())
  }, []);

  // --------------- get all quotes functionality --------------- //

  const [allQuotes, setAllQuotes] = useState({
    loading: true,
    error: null,
    value: null,
  });

  function handleAllQuotes(data) {
    console.log(data.status)
    if (data.message === "Success") {
      setAllQuotes(() => {
        return { loading: false, value: data.body };
      });
    }
    else {
      navigate("/login", { state: data.message })
    }
  }

  function fetchAllQuotes(callback) {
    fetch(`http://127.0.0.1:5000/quotes/`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.ok)
        {return response.json()}
        })
      .then((data) => callback(data))
      .catch((error) => console.log(error));
  }

  // --------------- // ---------------------- // --------------- //



  return (
    <>
      <div className={Styles.homeWrapper}>
        <div className={Styles.heading}>
          <span>Quote Collection</span>

          <button onClick={() => navigate("/create-new")}>+ New</button>
        </div>
        <div className={Styles.subheading}>
        
        </div>

        {allQuotes.loading ? (
          <span>Loading...</span>
        ) : (
          <div className={Styles.quotesWrapper}>
            {allQuotes.value.map((value) => {
              return (
                <QuoteComponent
                  key={value.id}
                  text={value.text}
                  author={value.author}
                  user_id={value.user_id}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
