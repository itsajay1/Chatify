import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
    const { JWT_SECRET} = ENV;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }


  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // not accessible via JavaScript, helps prevent XSS attacks : cross-site scripting attacks
    sameSite: "strict", // only send cookie for same site requests, helps prevent CSRF attacks : cross-site request forgery attacks
    secure: ENV.NODE_ENV === "development" ? false : true, // only send cookie over HTTPS in production
  });
  return token;
};
