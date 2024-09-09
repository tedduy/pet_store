import React, { ChangeEvent, FormEvent, useState } from "react";

import "./login.scss";
import { UserType } from "../app/types";
import { useCreateUserMutation } from "../features/user/userApi";
import CatDog from "../../public/Confused Dog & Cat.jpeg";

const SignIn = () => {
  const [createUser, { isLoading, isError, isSuccess }] =
    useCreateUserMutation();

  const [user, setUser] = useState<UserType>({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    repeatPassword: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const UserForm = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.password,
      email: user.email,
      phone: user.phone,
    };

    try {
      await createUser(UserForm).unwrap();
      console.log(UserForm);
    } catch (error) {
      console.error("Failed to register user: ", error);
    }
  };

  return (
    <div className="container">
      <div className="form-section">
        <h1>Sign In</h1>
        {isError && <p>Error registering user.</p>}
        {isSuccess && <p>User registered successfully!</p>}
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              value={user.firstname}
              onChange={handleChange}
              className="input-1"
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              value={user.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="username"
            placeholder="User name"
            value={user.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat your password"
            value={user.repeatPassword}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        
      </div>
      <figure>
        <img src={CatDog} />
        <a>Already have account?</a>
      </figure>
    </div>
  );
};

export default SignIn;
