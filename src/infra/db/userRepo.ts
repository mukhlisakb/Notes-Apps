import { Prisma, PrismaClient } from "@prisma/client";
import type { CreateUser, IUser, UpdateUser } from "../entity/interface";

export class UserRepository implements IUser {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async getAll() {
        const users = await this.prisma.user.findMany();
        return users;
    }

    async getOne(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        return user;
    }

    async create(data: CreateUser) {
        const newUser = await this.prisma.user.create({
            data
        })

        return newUser;
    }

    async update(userId: string, data: UpdateUser) {
        const updateUser = await this.prisma.user.update({
            where: {
                id: userId
            },
            data,
        })

        return updateUser;
    }

    async delete(userId: string) {
        await this.prisma.user.delete({
            where: {
                id: userId
            }
        })
    }
}