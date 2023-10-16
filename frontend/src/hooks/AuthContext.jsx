import React, { useContext, useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [refresher, setRefresher] = useState(Math.random());

  const [token, setToken] = useLocalStorage("token", null);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // returns data of authenticated user
  // uses refresher to fetch fresh data  -- to use, in a component with user data,
  // set setRefresher(Math.random()) in the function which should refresh the component
  useEffect(() => {
    createCurrentUser();
    console.log("Current user created.");
  }, [isAuthenticated, refresher]);

  useEffect(() => {
    fetchTokenState(setIsAuthenticated);
    console.log("Token state set.");
  }, [token, refresher]);

  
  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);


  function handleToken(accessToken) {
    if (accessToken !== null) {
      setToken("Bearer " + accessToken);
    }
  }

  function removeToken() {
    setToken(null);
  }

  // verifying token

  function fetchTokenState(callback) {
    fetch("http://127.0.0.1:5000/auth/verify_token", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          callback(false);
          navigate("/login", { state: "Token has expired" });
        } else if (response.ok) {
          callback(true);
        }
      })
      .catch((error) => console.log(error));
  }

  // handling current user

  function handleCurrentUser(data) {
    if (data.message === "Success") {
      setCurrentUser({
        userId: data.body.id,
        username: data.body.username,
        aboutUser: data.body.about_user,
        quotes: data.body.quotes,
        // favQuoteId: []
      });
    } else {
      navigate("/login", { state: data.message });
    }
  }

  function fetchCurrentUser(callback) {
    fetch(`http://127.0.0.1:5000/users/current`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => callback(data))
      .catch((error) => console.log(error));
  }

  function createCurrentUser() {
    if (isAuthenticated) {
      fetchCurrentUser(handleCurrentUser);
    } else {
      setCurrentUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        currentUser,
        setRefresher,
        handleToken,
        removeToken,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
