import { CallHandler } from "@nestjs/common";
import { of } from "rxjs";

export const nextMock = (): CallHandler => ({
  handle: jest.fn(() => of('response')),
});
