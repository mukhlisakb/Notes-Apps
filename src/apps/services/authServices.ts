import { SessionRepository } from "../../infra/db/sessionRepo";
import { UserRepository } from "../../infra/db/userRepo";
import "reflect-metadata"
import { injectable, inject } from "inversify";
import { TYPES } from "../../infra/entity/types";

export class AuthServices {
    private userRepo: UserRepository;
    private sessionRepo: SessionRepository;

    constructor(@inject(TYPES.userRepo) userRepo: UserRepository, @inject(TYPES.sessionRepo) sessionRepo: SessionRepository) {
        this.userRepo = userRepo;
        this.sessionRepo = sessionRepo;
    }

    async registerUser(name: string, email: string, password: string) {
        // check collision

        const user = await this.userRepo.getOne(email);

        if (user) {
            throw new Error("User already registered")
        }

        const hashedPassword = await Bun.password.hash(password)

        const newUser = await this.userRepo.create({
            name,
            email,
            password: hashedPassword,
            avatar: "",
        });

        return newUser
    }

    async loginUser(email: string, password: string) {
        const user = await this.userRepo.getOne(email)

        if (!user) {
            throw new Error("User not found")
        }

        const matchPassword = await Bun.password.verify(password, user.password)

        if (!matchPassword) {
            throw new Error("Invalid Credential");

        }

        const session = await this.sessionRepo.create(user.id)

        return session
    }

    async checkSession(sessionId: string) {
        const session = await this.sessionRepo.getOne(sessionId)

        if (!session) {
            throw new Error("Session invalid");
        }

        return "valid"
    }

    async decodeSession(sessionId: string) {
        const session = await this.sessionRepo.getOne(sessionId)

        if (!session) {
            throw new Error("Session invalid");
        }

        const user = await this.userRepo.getOne(session.userId)
        return { user };
    }
}