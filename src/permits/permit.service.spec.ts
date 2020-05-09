import { Test, TestingModule } from '@nestjs/testing';
import { PermitService } from './permit.service';

describe('PermitService', () => {
    let service: PermitService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [PermitService],
        }).compile();

        service = module.get<PermitService>(PermitService);
    });

  it('should be defined', () => {
      expect(service).toBeDefined();
  });

  it('should create permit code', async () => {
      const codeRegex = /[0-9]{6}/;
      const permit = await service.createPermit("TO-TOURISTIC");
      expect(permit.reasonAbbrevation).toBe("TO");
      expect(codeRegex.test(permit.code)).toBeTruthy();
  })
});
