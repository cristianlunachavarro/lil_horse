const LocalStrategy = require("passport-local").Strategy;
import { IStrategyOptionsWithRequest } from "passport-local";
import passport from "passport";

import { UserType, UserModel } from "../models/user/index";

type VerifyCallback = (
  error: any,
  user?: any,
  options?: { message?: string }
) => void;

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    } as IStrategyOptionsWithRequest,
    async (username: string, password: string, done: VerifyCallback) => {
      try {
        const user = await UserModel.findOne({
          username: username,
        });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const passwordValidation = await user.validatePassword(password);
        if (!passwordValidation) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (error) {
        console.error("Error in local strategy:", error);
        return done(error, false, { message: "Error in local strategy" });
      }
    }
  )
);

passport.serializeUser((user: any, done: (err: any, id?: string) => void) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId: UserType, done) => {
  try {
    const foundUser = await UserModel.findById(userId);
    done(null, foundUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport;