export class GetWhisperDTO {
  id: string;
  title: string;
  content: string;
  mood?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
