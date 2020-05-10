import { Test, TestingModule } from '@nestjs/testing';
import { PermitController } from './permit.controller';
import { PermitService } from './permit.service';
import { AuthService } from '../auth/auth.service';

describe('Permit Controller', () => {
    let controller: PermitController;
    let mockAuth = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PermitController],
            providers: [PermitService, { provide: AuthService, useValue: mockAuth }],
        }).compile();

        controller = module.get<PermitController>(PermitController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
