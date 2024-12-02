import { Request, Response } from "express";
import { loginValidation, signupValidation } from "../schema/auth";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

// #  user signup function

export const authSignup = async (req: Request, res: Response) => {
  const result = signupValidation.safeParse(req.body);
  if (!result.success)
    return res.status(400).json({ errors: result.error.issues });

  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user)
      return res
        .status(409)
        .json({ success: false, message: "User already exist" });

    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { firstName, lastName, email },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// # user login function

export const authLogin = async (req: Request, res: Response) => {
  const result = loginValidation.safeParse(req.body);
  if (!result.success)
    return res.status(400).json({ errors: result.error.issues });

  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(409)
        .json({ success: false, message: "Authentication failed" });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res
        .status(409)
        .json({ success: false, message: "Authentication failed" });

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is required");
    }
    const jwtToken = jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(201).json({
      success: true,
      message: "Login Successfully",
      jwtToken,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
