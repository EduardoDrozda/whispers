import { Module } from "@nestjs/common";
import { BaseRepository } from "./base";
import { USER_REPOSITORY, UserRepository } from "./user";
import { WHISPER_REPOSITORY, WhisperRepository } from "./whispers";

@Module({
  providers: [
    BaseRepository,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository
    },
    {
      provide: WHISPER_REPOSITORY,
      useClass: WhisperRepository
    }
  ],
  exports: [USER_REPOSITORY, WHISPER_REPOSITORY]
})
export class RepositoriesModule { }
