import { Container } from "inversify";
import { TYPES } from '../infra/entity/types';
import { UserRepository } from "../infra/db/userRepo";
import { SessionRepository } from "../infra/db/sessionRepo";
import { NoteRepository } from "../infra/db/noteRepo";
import { PrismaClient } from "@prisma/client";
import { AuthServices } from "./services/authServices";
import { NoteServices } from "./services/noteServices";

const container = new Container()

container.bind(TYPES.prisma).toConstantValue(new PrismaClient());

container.bind(TYPES.userRepo).to(UserRepository);
container.bind(TYPES.sessionRepo).to(SessionRepository);
container.bind(TYPES.noteRepo).to(NoteRepository);

container.bind(AuthServices).toSelf();
container.bind(NoteServices).toSelf();

// instance

export const authServices = container.get<AuthServices>(AuthServices);
export const noteSercives = container.get<NoteRepository>(NoteServices);