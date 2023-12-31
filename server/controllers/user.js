import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

import UserModel from "../models/user.js";

dotenv.config();

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "User doesn't exist." });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id.toString(),
      },
      "somesecret",
      { expiresIn: "1h" }
    );
    return res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
    console.log(err);
  }
};

export const signup = async (req, res, next) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exist." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password dont't match." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = new UserModel({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    await result.save();

    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      "somesecret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
  }
};

// Google Sign In
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);
export const googleSignIn = async (req, res, next) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  // console.log(tokens);

  res.json(tokens);
};
