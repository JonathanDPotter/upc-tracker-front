import React, { useEffect } from "react";
// components
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
// utils
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { setToken, setUser } from "./store/slices/authSlice";
import api from "./api";
// styles
import "./index.css";


const App = () => {
  // get auth data from redux store
  const { user, token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(setToken(""));
    dispatch(setUser(""));
  };

  useEffect(() => {
    api.validate(token).then((result) => {
      if (result.status !== 200) {
        logOut();
      }
    });
  }, []);

  // main return
  return (
    <div className="app">
      <Header logOut={logOut} />
      <div className="main">{user ? <Home /> : <Login />}</div>
    </div>
  );
};

export default App;
