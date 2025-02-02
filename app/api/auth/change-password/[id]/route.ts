
import { prisma } from "@/prisma/client";
import { changePasswordSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "../../[...nextauth]/authOptions";
import { hash } from "bcryptjs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({}, { status: 401 });

  const body = await request.json();
  const { id } = await params;

  const invalidUserResponse = Response.json(
    { error: "Invalid user." },
    { status: 404 }
  );

  const userId = parseInt(id);
  if (!userId) return invalidUserResponse;

  const validation = changePasswordSchema.safeParse(body);

  if (!validation.success)
    return Response.json(validation.error.format(), { status: 400 });

  const { password } = body;

  const user = await prisma.member.findUnique({
    where: { MemberID: userId },
  });

  if (!user) return invalidUserResponse;

  const hashedPassword = await hash(password, 12);

  await prisma.member.update({
    where: { MemberID: userId },
    data: {
      Password: hashedPassword,
    },
  });

  return Response.json({ message: "Password updated." });
}
