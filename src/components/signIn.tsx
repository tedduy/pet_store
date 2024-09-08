import React, { ChangeEvent, FormEvent, useState } from "react";

import { UserType } from "../app/types";
import "../styles/_login.scss";
import { useDispatch } from "react-redux";
import { useCreateUserMutation } from "../features/user/userApi";
import { use } from "framer-motion/client";

const SignIn = () => {
  const dispatch = useDispatch();
  const [createUser, { isLoading, isError, isSuccess }] =
    useCreateUserMutation();

  const [user, setUser] = useState<UserType>({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    repeatPassword: '',
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
      // Trigger the createUser mutation
      await createUser(UserForm).unwrap();
      alert("User registered successfully!");
      console.log(UserForm)
    } catch (error) {
      console.error("Failed to register user: ", error);
      alert("User registration failed!");
    }
  };

  return (
    <div className="container">
      <form className="" onSubmit={handleSubmit}>
        <div className="">
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            value={user.firstname}
            onChange={handleChange}
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
          name="repeatpassword"
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
      {isError && <p>Error registering user.</p>}
      {isSuccess && <p>User registered successfully!</p>}
    </div>
  );
};

export default SignIn;
