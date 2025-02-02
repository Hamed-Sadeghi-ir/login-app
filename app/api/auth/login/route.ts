import { prisma } from "@/prisma/client";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.member.findFirst({
      where: { Username: username },
    });

    if (!existingUser) {
      return Response.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // بررسی رمز عبور
    const isValidPassword = await compare(password, existingUser.Password);
    if (!isValidPassword) {
      return Response.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // if (!process.env.JWT_SECRET) {
    //   throw new Error("JWT_SECRET is not defined in the environment variables");
    // }

    // تولید JWT
    const token = jwt.sign(
      { id: existingUser.MemberID, username: existingUser.Username },
      // داده‌هایی که در توکن قرار می‌گیرد
      process.env.JWT_SECRET!,
      // کلید سری که باید در فایل .env ذخیره کنید
      { expiresIn: "1d" }
      // زمان انقضای توکن
    );

    // ارسال توکن به کلاینت
    return Response.json({
      token,
      user: {
        id: existingUser.MemberID,
        username: existingUser.Username,
      },
    });
  } catch (error) {
    // return Response.json({ error }, { status: 500 });
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
