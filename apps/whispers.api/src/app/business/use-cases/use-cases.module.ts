import { Module } from "@nestjs/common";
import { USERS_USE_CASES } from "./users";
import { RepositoriesModule } from "../../infrastructure/repositories";
import { HashModule } from "../../infrastructure/hash";

@Module({
  imports: [RepositoriesModule, HashModule],
  providers: [
    ...USERS_USE_CASES
  ],
  exports: [
    ...USERS_USE_CASES
  ]
})
export class UseCasesModule { }
