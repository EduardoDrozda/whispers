export class GetAuthDTO {
  token: string;
  expiresIn: string;
  user: {
    id: string;
    name: string;
  }
}
