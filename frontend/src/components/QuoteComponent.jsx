import { useAuth } from "../hooks/AuthContext";
import Styles from "./QuoteComponent.module.css";
import { useEffect, useState } from "react";

export default function QuoteComponent(props) {
  const {token} = useAuth()
  const { text, author, user_id, quote_id } = props;
  const { deleteQuote, addFavourite, editQuote } = props;

  const [userData, setUserData] = useState("");

  function handleUser(data) {
    if (data.message === "Success") {
      setUserData({
        id: data.body.id,
        username: data.body.username,
        aboutUser: data.body.about_user
      });
    }
  }

  function fetchUser(callback) {
    fetch(`http://127.0.0.1:5000/users/${user_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchUser(handleUser);
  }, []);

  function handleClick(){
    const msg = userData.username + ": " + userData.aboutUser

    alert(msg )
  }

  return (
    <>
      <div className={Styles.quoteWrapper}>
        <div className={Styles.quoteText}>
          &quot;{text}&quot; <br />
          <span className={Styles.quoteAuthor}>— {author}</span>
        </div>
        <div className={Styles.quoteData}>
        {addFavourite &&
          <button className={Styles.btn}>Add To Favourites</button>
        }
        {editQuote &&
          <button className={Styles.btn}>Edit</button>
        }
        {deleteQuote &&
          <button className={Styles.btn} onClick={() => deleteQuote(quote_id)}>
            Delete
          </button>
        }
        {user_id &&
          <span className={Styles.btnDescription}>
            Added By:{" "}
            <button onClick={() => handleClick()} className={`${Styles.btn} ${Styles.userBtn}`}>
              {userData ? userData.username : "unknown"}
            </button>
          </span>
        }

        </div>
      </div>
    </>
  );
}
