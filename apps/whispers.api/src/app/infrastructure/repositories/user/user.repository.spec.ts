import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { BaseRepository } from '../base';
import { Prisma, User } from '@prisma/client';

describe('UserRepository', () => {
  let repository: UserRepository;
  let baseRepositoryMock: jest.Mocked<BaseRepository>;

  beforeEach(async () => {
    baseRepositoryMock = {
      user: {
        create: jest.fn(),
        findFirst: jest.fn(),
      },
    } as unknown as jest.Mocked<BaseRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: BaseRepository,
          useValue: baseRepositoryMock,
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData: Prisma.UserCreateInput = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
      };

      const expectedUser: User = {
        id: 1,
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      baseRepositoryMock.user.create.mockResolvedValue(expectedUser);

      const result = await repository.create(userData);

      expect(result).toEqual(expectedUser);
      expect(baseRepositoryMock.user.create).toHaveBeenCalledWith({ data: userData });
      expect(baseRepositoryMock.user.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByEmail', () => {
    it('should find user by email case insensitive', async () => {
      const email = 'john@example.com';
      const expectedUser: User = {
        id: 1,
        name: 'John Doe',
        email,
        password: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      baseRepositoryMock.user.findFirst.mockResolvedValue(expectedUser);

      const result = await repository.findByEmail(email);

      expect(result).toEqual(expectedUser);
      expect(baseRepositoryMock.user.findFirst).toHaveBeenCalledWith({
        where: {
          email: {
            equals: email,
            mode: 'insensitive',
          },
        },
      });
      expect(baseRepositoryMock.user.findFirst).toHaveBeenCalledTimes(1);
    });

    it('should return null when user is not found', async () => {
      const email = 'nonexistent@example.com';

      baseRepositoryMock.user.findFirst.mockResolvedValue(null);

      const result = await repository.findByEmail(email);

      expect(result).toBeNull();
      expect(baseRepositoryMock.user.findFirst).toHaveBeenCalledWith({
        where: {
          email: {
            equals: email,
            mode: 'insensitive',
          },
        },
      });
      expect(baseRepositoryMock.user.findFirst).toHaveBeenCalledTimes(1);
    });
  });
});
