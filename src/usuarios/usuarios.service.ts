import {
  ForbiddenException,
  Global,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { $Enums, Usuario } from '@prisma/client';
import { AppService } from 'src/app.service';
import { SGUService } from 'src/sgu/sgu.service';
import { Client, createClient } from 'ldapjs';
import { MinioService } from 'src/minio/minio.service';

@Global()
@Injectable()
export class UsuariosService {
  constructor(
    private prisma: PrismaService,
    private sgu: SGUService,
    private app: AppService,
    private minio: MinioService
  ) { }

  async listaCompleta() {
    const lista = await this.prisma.usuario.findMany({
      orderBy: { nome: 'asc' },
      include: {
        unidade: true,
      }
    });
    if (!lista || lista.length == 0) throw new ForbiddenException('Nenhum usuário encontrado.');
    return lista;
  }

  validaPermissaoCriador(
    permissao: $Enums.Permissao,
    permissaoCriador: $Enums.Permissao,
  ) {
    //validar permissao criador
  }

  async permissoes(usuario: Usuario) {
    const permissoes = await this.prisma.usuarioSistema.findMany({
      where: { usuario_id: usuario.id },
      select: { permissao: true },
      distinct: ['permissao'],
    });
    if (!permissoes || permissoes.length === 0) return [];
    return permissoes.map((p) => p.permissao);
  }

  async criar(createUsuarioDto: CreateUsuarioDto, arquivo?: any, criador?: Usuario) {
    var { sistemas, unidade_id } = createUsuarioDto;
    const loguser = await this.buscarPorLogin(createUsuarioDto.login);
    if (loguser) throw new ForbiddenException('Login já cadastrado.');
    const emailuser = await this.buscarPorEmail(createUsuarioDto.email);
    if (emailuser) throw new ForbiddenException('Email já cadastrado.');
    if (!unidade_id) {
      const usuario_sgu = await this.sgu.tblUsuarios.findFirst({
        where: {
          cpRF: { startsWith: createUsuarioDto.login.substring(1) },
        },
      });
      if (usuario_sgu) {
        const codigo = usuario_sgu.cpUnid;
        const unidade = await this.prisma.unidade.findUnique({ where: { codigo } });
        unidade_id = unidade ? unidade.id : '';
      }
    }
    if (!sistemas || sistemas.length == 0) {
      const sistemas_padrao = await this.prisma.sistema.findMany({
        where: { padrao: true },
      });
      if (sistemas_padrao)
        sistemas = sistemas_padrao.map((t) => {
          return { id: t.id };
        });
    }
    console.log({unidade_id});
    delete createUsuarioDto.unidade_id;
    const usuario = await this.prisma.usuario.create({
      data: {
        ...createUsuarioDto,
        // ...(avatar && avatar !== '' && { avatar }),
        ...(unidade_id && unidade_id !== '' && { unidade_id })
      }
    });
    if (!usuario)
      throw new InternalServerErrorException(
        'Não foi possível criar o usuário, tente novamente.',
      );
    // var avatar: string;
    // if (arquivo) {
    //   avatar = await this.minio.uploadImage(arquivo, 'profile-pic/', usuario.id);
    //   if (avatar)
    //     await this.prisma.usuario.update({
    //       where: { id: usuario.id },
    //       data: { avatar }
    //     })
    // }
    return usuario;
  }

  async buscarTudo(
    usuario: Usuario = null,
    pagina: number = 1,
    limite: number = 10,
    status: number = 1,
    busca?: string,
    unidade_id?: string,
  ) {
    [pagina, limite] = this.app.verificaPagina(pagina, limite);
    const searchParams = {
      ...(busca && {
        OR: [
          { nome: { contains: busca } },
          { login: { contains: busca } },
          { email: { contains: busca } },
        ]
      }),
      ...(unidade_id !== '' && { unidade_id }),
    };
    const total = await this.prisma.usuario.count({ where: searchParams });
    if (total == 0) return { total: 0, pagina: 0, limite: 0, data: [] };
    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);
    const usuarios = await this.prisma.usuario.findMany({
      where: searchParams,
      orderBy: { nome: 'asc' },
      include: {
        unidade: true,
      },
      skip: (pagina - 1) * limite,
      take: limite,
    });
    return {
      total: +total,
      pagina: +pagina,
      limite: +limite,
      data: usuarios,
    };
  }

  async buscarPorId(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    return usuario;
  }

  async buscarPorEmail(email: string) {
    return await this.prisma.usuario.findUnique({ where: { email } });
  }

  async buscarPorLogin(login: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { login },
    });
    return usuario;
  }

  async atualizar(
    usuario: Usuario,
    id: string,
    updateUsuarioDto: CreateUsuarioDto,
    arquivo?: any
  ) {
    console.log(id);
    const usuarioLogado = await this.buscarPorId(usuario.id);
    if (updateUsuarioDto.login) {
      const usuario = await this.buscarPorLogin(updateUsuarioDto.login);
      if (usuario && usuario.id !== id)
        throw new ForbiddenException('Login já cadastrado.');
    }
    const usuarioAtualizado = await this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
    let avatar: any
    if (arquivo) {
      avatar = await this.minio.uploadImage(arquivo, 'profile-pic/', id);
      if (avatar)
        await this.prisma.usuario.update({
          where: { id },
          data: { avatar }
        })
    }
    return usuarioAtualizado;
  }

  async excluir(id: string) {
    await this.prisma.usuario.update({
      data: { status: 2 },
      where: { id },
    });
    return {
      desativado: true,
    };
  }

  async autorizaUsuario(id: string) {
    const autorizado = await this.prisma.usuario.update({
      where: { id },
      data: { status: 1 },
    });
    if (autorizado && autorizado.status === 1) return { autorizado: true };
    throw new ForbiddenException('Erro ao autorizar o usuário.');
  }

  async validaUsuario(id: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id }, include: { unidade: true } });
    if (!usuario) throw new ForbiddenException('Usuário não encontrado.');
    if (usuario.status !== 1) throw new ForbiddenException('Usuário inativo.');
    return usuario;
  }

  async buscarNovo(login: string) {
    const usuarioExiste = await this.buscarPorLogin(login);
    if (usuarioExiste && usuarioExiste.status === 1) throw new ForbiddenException('Login já cadastrado.');
    if (usuarioExiste && usuarioExiste.status !== 1) {
      const usuarioReativado = await this.prisma.usuario.update({ where: { id: usuarioExiste.id }, data: { status: 1 } });
      return usuarioReativado;
    }
    const rf = login.substring(1);
    const usuario_sgu = await this.sgu.tblUsuarios.findFirst({
      where: {
        cpRF: { startsWith: rf },
      }
    });
    var unidade_id = '';
    if (usuario_sgu) {
      const codigo = usuario_sgu.cpUnid;
      const unidade = await this.prisma.unidade.findUnique({ where: { codigo } });
      unidade_id = unidade ? unidade.id : '';
    }
    const client: Client = createClient({
      url: process.env.LDAP_SERVER,
    });
    await new Promise<void>((resolve, reject) => {
      client.bind(`${process.env.USER_LDAP}${process.env.LDAP_DOMAIN}`, process.env.PASS_LDAP, (err) => {
        if (err) {
          client.destroy();
          reject(new UnauthorizedException('Credenciais incorretas 2.'));
        }
        resolve();
      });
    });
    const usuario_ldap = await new Promise<any>((resolve, reject) => {
      client.search(
        process.env.LDAP_BASE,
        {
          filter: `(&(samaccountname=${login})(company=SMUL))`,
          scope: 'sub',
          attributes: ['name', 'mail'],
        },
        (err, res) => {
          if (err) {
            client.destroy();
            resolve('erro');
          }
          res.on('searchEntry', async (entry) => {
            const nome = JSON.stringify(
              entry.pojo.attributes[0].values[0],
            ).replaceAll('"', '');
            const email = JSON.stringify(
              entry.pojo.attributes[1].values[0],
            ).replaceAll('"', '').toLowerCase();
            resolve({ nome, email });
          });
          res.on('error', (err) => {
            client.destroy();
            resolve('erro');
          });
          res.on('end', () => {
            client.destroy();
            resolve('erro');
          });
        },
      );
    });
    client.destroy();
    if (!usuario_ldap.email) throw new UnauthorizedException('Credenciais incorretas.');
    return {
      login,
      nome: usuario_ldap.nome,
      email: usuario_ldap.email,
      unidade_id
    };
  }
}
