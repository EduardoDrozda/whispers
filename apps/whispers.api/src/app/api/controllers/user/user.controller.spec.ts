import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '../../../business/use-cases/users/create-user';

describe('UserController', () => {
  let controller: UserController;

  let createUserUseCaseMock = {
    execute: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{
        provide: CreateUserUseCase,
        useValue: createUserUseCaseMock
      }]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createUserUseCase', async () => {
    const createUserDto = {
      name: 'name',
      email: 'email',
      password: 'password'
    }

    await controller.create(createUserDto)

    expect(createUserUseCaseMock.execute).toHaveBeenCalledWith(createUserDto)
    expect(createUserUseCaseMock.execute).toHaveBeenCalledTimes(1)
  })
});
