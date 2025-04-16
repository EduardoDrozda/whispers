declare module '@types/express' {
  import { Request } from 'express';

  export interface Request {
    userId: {
      value: string;
    };
  }
}
