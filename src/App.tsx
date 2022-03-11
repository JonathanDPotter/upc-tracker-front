import React, { useState, useEffect } from "react";
import { useGetAllGroupsQuery } from "./store/slices/groupSlice";
// components
import CreateGroup from "./components/CreateGroup/CreateGroup";
import Group from "./components/Group/Group";
import Login from "./components/Login/Login";
// interfaces
import { Igroup } from "./interfaces/group";
// utils
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { setToken, setUser } from "./store/slices/authSlice";
import api from "./api";
// styles
import "./App.scss";

const App = () => {
  // get data from redux store
  const { data, error, isLoading, refetch } = useGetAllGroupsQuery("");
  error && console.log(error);
  const { user, token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  // state for showing modals
  const [createOpen, setCreateOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState<Igroup | null>(null);

  // element to display if user is authorized
  const AuthPage = () => {
    return (
      <section className="groups">
        <h2>Saved Groups</h2>
        {isLoading && <h1>Loading...</h1>}
        {data &&
          data.map((datum: any) => (
            <button onClick={() => setGroupOpen(datum)} key={datum._id}>
              {datum.title}
            </button>
          ))}
      </section>
    );
  };

  const logOut = () => {
    dispatch(setToken(""));
    dispatch(setUser(""));
  };

  const apiKeyRequest = () => {
    // fill this out
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
      <header>
        <h1>UPC Tracker</h1>
        {user && (
          <button onClick={() => setCreateOpen(true)}>Create New Group</button>
        )}
        {user ? (
          <button className="logout" onClick={logOut}>
            Log Out
          </button>
        ) : (
          <button className="logout" onClick={apiKeyRequest}>
            request api key
          </button>
        )}
      </header>
      <div className="main">{user ? <AuthPage /> : <Login />}</div>
      {createOpen && <CreateGroup close={() => setCreateOpen(false)} />}
      {groupOpen && (
        <Group
          id={groupOpen._id}
          savedTitle={groupOpen.title}
          savedUpcs={groupOpen.upcs}
          close={() => setGroupOpen(null)}
        />
      )}
    </div>
  );
};

export default App;
