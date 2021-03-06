import React, { useState, FormEvent } from "react";
// utils
import { useAppDispatch } from "../../store/hooks";
import { setToken, setUser } from "../../store/slices/authSlice";
import api from "../../api";


const Login = () => {
  const dispatch = useAppDispatch();

  // form state for login
  const initialState = {
    username: "",
    password: "",
    newUser: false,
  };
  const [formState, setFormState] = useState(initialState);
  const { username, password, newUser } = formState; //destructure for easier use

  // event handlers for login form change and submission
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    if (id === "newUser") {
      setFormState({ ...formState, newUser: !newUser });
    } else {
      setFormState({ ...formState, [id]: value });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (newUser) await api.register({ username, password });
      const response = await api.login({ username, password });

      if (response.data.token) {
        dispatch(setToken(response.data.token));
        dispatch(setUser(username));
      } else {
        window.alert(response.data.message);
        setFormState(initialState);
      }
    } catch (error: any) {
      window.alert(error.message);
    }
  };

  return (
    <div className="page">
      <h2 className="page-title">{newUser ? "Register" : "Login"}</h2>
      <form action="submit" onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="newUser">New User?</label>
          <input
            type="checkbox"
            name="newUser"
            id="newUser"
            checked={newUser}
            onChange={handleChange}
            className="ml-4 mr-auto w-fit mt-1"
            />
        </div>
        <div className="label-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={username}
            autoComplete="username"
          />
        </div>
        <div className="label-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            onChange={handleChange}
            value={password}
          />
        </div>
        <input type="submit" value="submit" className="btn" />
      </form>
    </div>
  );
};

export default Login;
