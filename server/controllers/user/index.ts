import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { UserModel } from "../../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "lil_horse";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      const errorMessage = {
        error: "User already exist",
      };
      return res.status(400).json(errorMessage);
    }

    const newUser = new UserModel({
      username,
      password,
    });

    const user = await newUser.save();
    const { _id } = user;

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ user: { username, _id }, token });
  } catch (err) {
    console.error("Error creating a user:", err);
    const errorResponse = {
      error: err || "Internal Server Error",
    };
    res.status(500).json(errorResponse);
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: any, user: any, info: any) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : "Login failed",
          user: user,
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.json({ user, token });
      });
    }
  )(req, res, next);
};

export const me = (req: Request, res: Response) => {
  const { user } = req;
  //@ts-ignore-next-line
  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.json({ user, token });
};
