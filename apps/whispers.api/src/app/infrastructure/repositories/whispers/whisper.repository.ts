import { Prisma, Whisper } from "@prisma/client";
import { BaseRepository } from "../base";
import { IWhisperRepository } from "./IWhisper.repository";

export class WhisperRepository extends BaseRepository implements IWhisperRepository {
  create(data: Prisma.WhisperCreateInput): Promise<Whisper> {
    return this.whisper.create({ data });
  }

  findAllByUserId(userId: string): Promise<Whisper[]> {
    return this.whisper.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      }
    });
  }

  findOneByIdAndUserId(id: string, userId: string): Promise<Whisper | null> {
    return this.whisper.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  update(id: string, userId: string, data: Prisma.WhisperUpdateInput): Promise<Whisper> {
    return this.whisper.update({
      where: {
        id,
        userId,
      },
      data: {
        ...data
      },
    });
  }
  delete(id: string, userId: string): Promise<Whisper> {
    throw new Error("Method not implemented.");
  }
}
