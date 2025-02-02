import { prisma } from "@/prisma/client";
import { hash } from "bcryptjs";
import { signupSchema } from "@/app/validationSchemas";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, username, password } = await req.json();

    const validation = signupSchema.safeParse({
      firstName,
      lastName,
      username,
      password,
    });

    if (!validation.success)
      return Response.json(validation.error.format(), { status: 400 });

    const existingUser = await prisma.member.findFirst({
      where: { Username: username },
    });

    if (existingUser) {
      return Response.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.member.create({
      data: {
        FirstName: firstName,
        LastName: lastName,
        Username: username,
        Password: hashedPassword,
      },
    });

    return Response.json({
      id: user.MemberID,
      firstName: user.FirstName,
      lastName: user.LastName,
      username: user.Username,
    });
  } catch (error) {
    // return Response.json({ error }, { status: 500 });
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
