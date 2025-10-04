import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { dbConnect } from "../../../lib/db";
import User from "../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  return res.status(201).json({ message: "User created successfully" });
}
