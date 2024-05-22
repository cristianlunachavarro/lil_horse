"use client";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { createUser } from "../../actions/user";
import styles from "./RegisterPage.module.css";
import Image from "next/image";
import { AppDispatch } from "@/store/store";
import useAuthentication from "@/hooks/useAuthentication";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const router = useRouter();

  useAuthentication();

  const dispatch = useDispatch<AppDispatch>();

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: {
      username?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

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
    } else if (password !== confirmPassword) {
      newErrors.password = "Password must be the same";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(createUser(username, password));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <div className="title wt tstrong pil">Please create your account!</div>
        <Image
          priority
          src="/images/welcome-icon.png"
          alt="welcome-img"
          width={500}
          height={500}
        />
      </div>
      <div className={styles.login}>
        <div className="h1 tstrong">Register</div>
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
        <div className={styles.inputContainer}>
          <h3 className="dgt tmedium">Confirm Password</h3>
          <input
            type="password"
            placeholder="∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗"
            className={styles.textInput}
            onChange={handleConfirmPassword}
          />
          <div
            className={`${styles.error} ${
              errors.password ? styles.visible : ""
            } h6`}
          >
            {errors.password}
          </div>{" "}
        </div>
        <button
          className={`h3 tstrong wt ${styles.loginButton}`}
          onClick={handleSubmit}
        >
          Create
        </button>
        <button
          className={`h3 tstrong wt ${styles.loginButton}`}
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
