import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDTO } from '../../../business/use-cases/users/dtos/create-user.dto';
import { CreateUserUseCase } from '../../../business/use-cases/users/create-user';

@Controller({ version: '1', path: 'users' })
export class UserController {

  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateUserDTO) {
    return this.createUserUseCase.execute(data);
  }

}
