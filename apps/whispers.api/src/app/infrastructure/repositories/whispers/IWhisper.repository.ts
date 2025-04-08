import { Prisma, Whisper } from "@prisma/client";

export const WHISPER_REPOSITORY = Symbol("WHISPERS_REPOSITORY");

export interface IWhisperRepository {
  create(data: Prisma.WhisperCreateInput): Promise<Whisper>;
  findOneByIdAndUserId(id: string): Promise<Whisper | null>;
  findAllByUserId(userId: string): Promise<Whisper[]>;
  update(id: string, userId: string, data: Prisma.WhisperUpdateInput): Promise<Whisper>;
  delete(id: string, userId: string): Promise<Whisper>;
}
