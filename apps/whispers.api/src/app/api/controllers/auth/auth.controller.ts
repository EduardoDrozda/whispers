import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateAuthUseCase } from '../../../business/use-cases/auth/create-auth/create-auth.usecase';
import { IsPublic } from '../../../infrastructure/jwt';
import { CreateAuthDTO } from '../../../business/use-cases/auth/dtos';

@Controller({ path: "", version: "1" })
export class AuthController {
  constructor(private readonly createAuthUseCase: CreateAuthUseCase) { }

  @IsPublic()
  @Post("login")
  @HttpCode(HttpStatus.CREATED)
  execute(@Body() data: CreateAuthDTO) {
    return this.createAuthUseCase.execute(data);
  }
}
