import { ChangeEvent, FormEvent, useState } from "react";
import { UserType } from "../app/types";
import { useLoginUserMutation } from "../features/user/userApi";

const SignUp = () => {
  const [loginUser, { isLoading, isError, isSuccess }] = useLoginUserMutation();

  const [login, setLogin] = useState<UserType>({
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
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const LoginForm = {
      username: login.username,
      password: login.password,
    };

    try {
      const res = await loginUser(LoginForm).unwrap();
      console.log(res);
    } catch (error) {
      console.log("Fail to accept", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={login.username}
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={login.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default SignUp;
