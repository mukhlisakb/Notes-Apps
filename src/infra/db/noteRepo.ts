import { PrismaClient } from "@prisma/client";
import type { CreateNotes, INote, UpdateNotes } from "../entity/interface";
import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPES } from '../entity/types';
@injectable()
export class NoteRepository implements INote {
    private prisma: PrismaClient;

    constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
        this.prisma = prisma
    }

    async getAll(userId: string) {
        // get all notes base on userid
        const notes = await this.prisma.note.findMany({
            where: {
                id: userId
            },
        });
        return notes
    }

    async getOne(noteId: string) {
        const note = await this.prisma.note.findUnique({
            where: {
                id: noteId
            }
        });

        return note
    }

    async create(data: CreateNotes) {
        const newNote = await this.prisma.note.create({
            data
        });

        return newNote;
    }

    async update(noteId: string, data: UpdateNotes) {
        const updateNotes = await this.prisma.note.update({
            where: {
                id: noteId
            },
            data
        });

        return updateNotes;
    }

    async delete(noteId: string) {
        await this.prisma.note.delete({
            where: {
                id: noteId,
            }
        });
    }
}