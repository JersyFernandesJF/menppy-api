import { prisma } from "~/lib/prisma";
import { UserRepository } from "../domain/repositories";
import { CreateUserRepository } from "../domain/repositories/create-user-repository";
import { FindUserByKey } from "../domain/repositories/find-user-by-key";

export class UserPrismaRepository implements UserRepository {
  async create(
    params: CreateUserRepository.Params
  ): CreateUserRepository.Response {
    const { ...user } = await prisma.user.create({ data: params });
    return user; 
  }

  async loadByKey(params: FindUserByKey.Params): FindUserByKey.Response {
    try {
      const user = await prisma.user.findFirst({ where: params.key, include: {stores: true} });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export const userPrismaRepository = new UserPrismaRepository();
