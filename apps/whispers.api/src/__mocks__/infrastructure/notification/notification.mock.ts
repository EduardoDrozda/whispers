export const notificationMock: jest.Mocked<any> = {
  hasNotification: jest.fn(),
  add: jest.fn(),
  getMessages: jest.fn(),
  clear: jest.fn(),
};
