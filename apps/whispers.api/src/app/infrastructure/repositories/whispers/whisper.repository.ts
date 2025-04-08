import { Prisma, Whisper } from "@prisma/client";
import { BaseRepository } from "../base";
import { IWhisperRepository } from "./IWhisper.repository";

export class WhisperRepository extends BaseRepository implements IWhisperRepository {
  findOneByIdAndUserId(id: string): Promise<Whisper | null> {
    throw new Error("Method not implemented.");
  }
  findAllByUserId(userId: string): Promise<Whisper[]> {
    throw new Error("Method not implemented.");
  }
  update(id: string, userId: string, data: Prisma.WhisperUpdateInput): Promise<Whisper> {
    throw new Error("Method not implemented.");
  }
  delete(id: string, userId: string): Promise<Whisper> {
    throw new Error("Method not implemented.");
  }
  create(data: Prisma.WhisperCreateInput): Promise<Whisper> {
    return this.whisper.create({ data });
  }
}
