import { CreateUserUseCase } from "./create-user/create-user.use-case";
import { GetUserByEmailUseCase } from "./get-user-by-email/get-user-by-email.usecase";

export const USERS_USE_CASES = [
  CreateUserUseCase,
  GetUserByEmailUseCase,
]
