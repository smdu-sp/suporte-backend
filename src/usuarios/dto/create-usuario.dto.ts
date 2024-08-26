import { $Enums } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

interface PermissaoSistema {
  id: string;
  permissao?: $Enums.Permissao;
}

export class CreateUsuarioDto {
  @MinLength(10, { message: 'Nome tem de ter ao menos 10 caracteres.' })
  @IsString({ message: 'Tem de ser texto.' })
  nome: string;

  @IsString({ message: 'Login inválido!' })
  @MinLength(7, { message: 'Login tem de ter ao menos 7 caracteres.' })
  login: string;

  @IsString({ message: 'Login inválido!' })
  @IsEmail({}, { message: 'Login tem de ter ao menos 7 caracteres.' })
  email: string;

  @IsBoolean({ message: 'Valor inválido.' })
  dev?: boolean;

  @IsNumber({}, { message: 'Status inválido!' })
  status?: number;

  @IsString({ message: 'Status inválido!' })
  unidade_id?: string;

  @IsArray({ message: 'Selecione os sistemas!' })
  sistemas?: PermissaoSistema[];
}
