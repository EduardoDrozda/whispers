import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserUseCase } from "./create-user.use-case";
import { notificationMock } from "../../../../../mocks/infrastructure/notification";
import { NotificationService } from "../../../../infrastructure/notification";
import { loggerMock } from "../../../../../mocks/infrastructure/logger";
import { LoggerService } from "../../../../infrastructure/logger";
import { HashService } from "../../../../infrastructure/hash";
import { userRepositoryMock } from "../../../../../mocks/infrastructure/repositories";
import { USER_REPOSITORY } from "../../../../infrastructure/repositories";
import { CreateUserDTO } from "../dtos";
import { HttpStatus } from "@nestjs/common";


describe('CreateUserUseCase', () => {
  let usecase: CreateUserUseCase;
  let notification = { ...notificationMock }
  let logger = { ...loggerMock }
  let repositoryMock = { ...userRepositoryMock }
  let hashService: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        HashService,
        {
          provide: NotificationService,
          useValue: notification
        },
        {
          provide: LoggerService,
          useValue: logger
        },
        {
          provide: USER_REPOSITORY,
          useValue: repositoryMock
        }
      ]
    }).compile();

    usecase = module.get<CreateUserUseCase>(CreateUserUseCase);
    hashService = module.get<HashService>(HashService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should create a user', async () => {
    const data: CreateUserDTO = {
      name: 'John Doe',
      email: 'dummy@email.com',
      password: '123456'
    }

    jest.spyOn(hashService, 'hash').mockResolvedValue('hashed_password');

    repositoryMock.findByEmail.mockResolvedValue(null);
    repositoryMock.create.mockResolvedValue({
      id: 1,
      name: data.name,
      email: data.email,
      password: 'hashed_password',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await usecase.execute(data);

    expect(repositoryMock.findByEmail).toHaveBeenCalledWith(data.email);
    expect(repositoryMock.findByEmail).toHaveBeenCalledTimes(1);
    expect(repositoryMock.create).toHaveBeenCalledWith({
      name: data.name,
      email: data.email,
      password: 'hashed_password'
    });

    expect(repositoryMock.create).toHaveBeenCalledTimes(1);
  });

  it('should not create a user if it already exists', async () => {
    const data: CreateUserDTO = {
      name: 'John Doe',
      email: 'dummy@email.com',
      password: '123456'
    }

    jest.spyOn(hashService, 'hash').mockResolvedValue('hashed_password');

    const createdUser = {
      id: 1,
      name: data.name,
      email: data.email,
      password: 'hashed_password',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    repositoryMock.findByEmail.mockResolvedValue(createdUser);
    notification.add.mockImplementation(() => {});

    await usecase.execute(data);

    expect(repositoryMock.findByEmail).toHaveBeenCalledWith(data.email);
    expect(repositoryMock.findByEmail).toHaveBeenCalledTimes(1);
    expect(notification.add).toHaveBeenCalledWith(`User already exists with email ${data.email}`, HttpStatus.CONFLICT);
    expect(notification.add).toHaveBeenCalledTimes(1);
    expect(repositoryMock.create).not.toHaveBeenCalled();
  });
});
