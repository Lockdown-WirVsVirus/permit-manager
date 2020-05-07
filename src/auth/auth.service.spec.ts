import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User, UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  let mockUsersService = {
    findOne: (username): Promise<User> => {
      return Promise.resolve({
        userId: "0",
        username: "test",
        hashedPassword: "25bf8e1a2393f1108d37029b3df5593236c755742ec93465bbafa9b290bddcf6",
      })
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService}
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
