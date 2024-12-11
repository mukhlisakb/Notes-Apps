
import type { NoteRepository } from "../../infra/db/noteRepo";
import type { CreateNotes, UpdateNotes } from "../../infra/entity/interface";
import "reflect-metadata"
import { injectable, inject } from "inversify";
import { TYPES } from "../../infra/entity/types";

@injectable()
export class NoteServices {
    private noteRepo: NoteRepository;

    constructor(@inject(TYPES.noteRepo) noteRepo: NoteRepository) {
        this.noteRepo = noteRepo;
    }

    async getAll(userId: string) {
        const notes = await this.noteRepo.getAll(userId)

        return notes
    }

    async getOne(noteId: string) {
        const note = await this.noteRepo.getOne(noteId)
        return note
    }

    async create(data: CreateNotes) {
        const newNotes = await this.noteRepo.create(data)
        return newNotes
    }

    async update(noteId: string, data: UpdateNotes) {
        const updateNote = await this.noteRepo.update(noteId, data)
        return updateNote;
    }

    async delete(noteId: string) {
        await this.noteRepo.delete(noteId)
    }

}