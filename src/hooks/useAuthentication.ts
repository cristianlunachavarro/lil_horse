"use client";

import { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { me } from "@/actions/user";
import debounce from "@/utils/debounce";

const AUTHPATHS = ["/home"];
const NONAUTHPATHS = ["/login", "/register"];

const useAuthentication = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.userReducer.user);
  const path = usePathname();

  useEffect(() => {
    dispatch(me());
  }, []);

  const redirect = debounce(() => {
    if (Object.keys(user).length && NONAUTHPATHS.includes(path)) {
      router.push("/home");
    }
    if (!Object.keys(user).length && AUTHPATHS.includes(path)) {
      router.push("/login");
    }
  }, 500)

  useEffect(() => {
    redirect()
  }, [path, user]);
};

export default useAuthentication;
