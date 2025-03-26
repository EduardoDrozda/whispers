import { Module } from "@nestjs/common";
import { BaseRepository } from "./base";
import { USER_REPOSITORY, UserRepository } from "./user";

@Module({
  providers: [
    BaseRepository,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository
    }],
    exports: [USER_REPOSITORY]
})
export class RepositoriesModule { }
