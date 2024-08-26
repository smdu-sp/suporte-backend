import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioTipoController } from './usuario_tipo.controller';
import { UsuarioTipoService } from './usuario_tipo.service';

describe('UsuarioTipoController', () => {
  let controller: UsuarioTipoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioTipoController],
      providers: [UsuarioTipoService],
    }).compile();

    controller = module.get<UsuarioTipoController>(UsuarioTipoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
