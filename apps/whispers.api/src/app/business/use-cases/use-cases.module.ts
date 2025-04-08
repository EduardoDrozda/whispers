import { Module } from "@nestjs/common";
import { USERS_USE_CASES } from "./users";
import { RepositoriesModule } from "../../infrastructure/repositories";
import { HashModule } from "../../infrastructure/hash";
import { AUTH_USE_CASES } from "./auth";
import { WHISPER_USE_CASES } from "./whisper";

@Module({
  imports: [RepositoriesModule, HashModule],
  providers: [
    ...USERS_USE_CASES,
    ...AUTH_USE_CASES,
    ...WHISPER_USE_CASES,
  ],
  exports: [
    ...USERS_USE_CASES,
    ...AUTH_USE_CASES,
    ...WHISPER_USE_CASES,
  ]
})
export class UseCasesModule { }
