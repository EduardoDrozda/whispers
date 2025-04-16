import { Test, TestingModule } from "@nestjs/testing";
import { EnviromentService } from "./enviroment.service";
import { ConfigService } from "@nestjs/config";
import { configServiceMock } from "../../../mocks/config";

describe('EnviromentService', () => {
  let service: EnviromentService;
  let configService = {...configServiceMock};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnviromentService,
        {
          provide: ConfigService,
          useValue: configService
        }
      ],
    }).compile();

    service = module.get<EnviromentService>(EnviromentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the value of the key', () => {
    const key = 'NODE_ENV';
    const value = 'value';
    jest.spyOn(configService, 'get').mockReturnValue(value);

    expect(service.get(key)).toBe(value);
  });
});
