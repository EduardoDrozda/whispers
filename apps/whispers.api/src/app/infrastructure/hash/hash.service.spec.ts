import { Test, TestingModule } from "@nestjs/testing";
import { HashService } from "./hash.service";

describe('HashService', () => {
  let service: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashService
      ],
    }).compile();

    service = module.get<HashService>(HashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should hash a string', async () => {
    const value = 'value';
    const hash = await service.hash(value);

    expect(hash).toBeDefined();
    expect(hash).not.toEqual(value);
  });

  it('should compare a string with a hash', async () => {
    const value = 'value';
    const hash = await service.hash(value);

    expect(await service.compare(value, hash)).toBe(true);
  });
});
