import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioTipoService } from './usuario_tipo.service';

describe('UsuarioTipoService', () => {
  let service: UsuarioTipoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioTipoService],
    }).compile();

    service = module.get<UsuarioTipoService>(UsuarioTipoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
