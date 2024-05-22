"use client";

import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { me } from "@/actions/user";

const AUTHPATHS = ["/home"];
const NONAUTHPATHS = ["/login", "/register"];

const useAuthentication = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.userReducer.user);
  const path = usePathname();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(me());
      setAuthChecked(true);
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (authChecked) {
      if (Object.keys(user).length && NONAUTHPATHS.includes(path)) {
        router.push("/home");
      } else if (!Object.keys(user).length && AUTHPATHS.includes(path)) {
        router.push("/login");
      }
    }
  }, [path, user, authChecked, router]);

  return authChecked;
};

export default useAuthentication;
