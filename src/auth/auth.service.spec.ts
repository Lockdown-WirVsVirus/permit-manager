import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User, UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  // do not mock jwt service, just init with secret
  const jwtService: JwtService = new JwtService({secret: "test"});

  let mockUsersService = {
    findOne: (username): Promise<User> => {
      return Promise.resolve({
        userId: "0",
        username: username,
        roles: ["TOURISTIC"],
        hashedPassword: "25bf8e1a2393f1108d37029b3df5593236c755742ec93465bbafa9b290bddcf6",
      })
    }
  }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, { provide: JwtService, useValue: jwtService }, { provide: UsersService, useValue: mockUsersService }],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate jwt', (done) => {
    return expect(service.generateToken('test', ['RESIDENCE', 'TOURISTIC']).then((response) => {
      const splitJwt = response.token.split('.');
      expect(splitJwt.length).toEqual(3);
      const decodedBody = Buffer.from(splitJwt[1], 'base64');
      const parsedJson = JSON.parse(decodedBody.toString('ascii'));
      expect(parsedJson).toMatchObject({ sub: 'test', roles: ['RESIDENCE', 'TOURISTIC']});
      return done();
    }))
  })
});
