import { Test, TestingModule } from '@nestjs/testing';
import { ChamadosGateway } from './chamados.gateway';

describe('ChamadosGateway', () => {
  let gateway: ChamadosGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChamadosGateway],
    }).compile();

    gateway = module.get<ChamadosGateway>(ChamadosGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
