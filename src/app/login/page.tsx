"use client";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "../../actions/user";
import styles from "./LoginPage.module.css";
import Image from "next/image";
import { AppDispatch } from "@/store/store";
import useAuthentication from "@/hooks/useAuthentication";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const router = useRouter();

  const authChecked = useAuthentication();

  if (!authChecked) {
    return <Loader />;
  }

  const dispatch = useDispatch<AppDispatch>();

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username) {
      newErrors.username = "Username is required.";
    } else if (username.length < 4) {
      newErrors.username = "Username must be at least 3 characters long.";
    } else if (!validateEmail(username)) {
      newErrors.username = "Username must be a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser(username, password));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <div className="title wt tstrong">Welcome to our Website</div>
        <Image
          priority
          src="/images/welcome-icon.png"
          alt="welcome-img"
          width={500}
          height={500}
        />
      </div>
      <div className={styles.login}>
        <div className="h1 tstrong">Login</div>
        <div className="h5 gt mtm mbm">
          Welcome back! Please login to your account
        </div>
        <div className={styles.inputContainer}>
          <h3 className="dgt tmedium">User name</h3>
          <input
            type="text"
            placeholder="ejemplo@email.com"
            className={styles.textInput}
            onChange={handleUsername}
          />
          <div
            className={`${styles.error} ${
              errors.username ? styles.visible : ""
            } h6`}
          >
            {errors.username}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <h3 className="dgt tmedium">Password</h3>
          <input
            type="password"
            placeholder="∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗"
            className={styles.textInput}
            onChange={handlePassword}
          />
          <div
            className={`${styles.error} ${
              errors.password ? styles.visible : ""
            } h6`}
          >
            {errors.password}
          </div>{" "}
        </div>
        <div className={`${styles.remember} mtl`}>
          <div>
            <input type="checkbox" />
            <p className="h6">Remember me</p>
          </div>
          <p className="h6 gt">Forgot my password</p>
        </div>
        <button
          className={`h3 tstrong wt ${styles.loginButton}`}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className={`h3 tstrong wt ${styles.loginButton}`}
          onClick={() => router.push("/register")}
        >
          Register
        </button>
        <div className={styles.dividerContainer}>
          <div className={styles.divider} />
          or
          <div className={styles.divider} />
        </div>
        <div className={styles.loginIcons}>
          <Image
            src="/images/gmail-icon.png"
            width={50}
            height={50}
            alt="gmail-icon"
            className="mrm"
          />
          <Image
            src="/images/instagram-icon.png"
            width={50}
            height={50}
            alt="instagram-icon"
          />
          <Image
            src="/images/twitter-icon.png"
            width={50}
            height={50}
            alt="twitter-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
