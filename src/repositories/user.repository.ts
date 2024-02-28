import { Prisma } from "@prisma/client";
import { prisma } from "~/lib/prisma";

class User {
  id: string;
  name: string;
  email: string;
  password_hash: string | null;
}

type UserCreateParams = Prisma.UserCreateInput

class UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async getByEmail(email: User["email"]) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        stores: true,
      },
    });

    return user;
  }

  async getById(id: User["id"]) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        stores: true
      }
    });

    return user;
  }
}

export { User, UserCreateParams, UserRepository };

