import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";



// # To check is user authenticated 

export const checkIsAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers["authorization"];

  if (!auth) return res.status(403).json({ message: "Unauthorized" });
  try {
    if (!JWT_SECRET)
      throw new Error("JWT_SECRET environment variable is required");
    const decoded = jwt.verify(auth, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized" });
  }
};
