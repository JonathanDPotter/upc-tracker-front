import React, { useState, FormEvent } from "react";
// utils
import { useAppDispatch } from "../../store/hooks";
import { setToken, setUser } from "../../store/slices/authSlice";
import api from "../../api";

const Login = () => {
  const dispatch = useAppDispatch();

  // form state for login
  const initialState = { username: "", password: "" };
  const [formState, setFormState] = useState(initialState);
  const { username, password } = formState; //destructure for easier use

  // event handlers for login form change and submission
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    setFormState({ ...formState, [id]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.login({ username, password });
      console.log(response);
      await dispatch(setToken(response.data.token));
      await dispatch(setUser(username));
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section className="login">
      <h1>Login</h1>
      <form action="submit" onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={username}
          />
        </div>
        <div className="label-input">
          <label htmlFor="password">password</label>
          <input
            type="text"
            name="password"
            id="password"
            onChange={handleChange}
            value={password}
          />
        </div>
        <input type="submit" value="submit" />
      </form>
    </section>
  );
};

export default Login;
