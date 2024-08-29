import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @MinLength(10, { message: 'Nome tem de ter ao menos 10 caracteres.' })
  @IsString({ message: 'Tem de ser texto.' })
  nome: string;

  @ApiProperty()
  @IsString({ message: 'Login inválido!' })
  @MinLength(7, { message: 'Login tem de ter ao menos 7 caracteres.' })
  login: string;

  @ApiProperty()
  @IsString({ message: 'Login inválido!' })
  @IsEmail({}, { message: 'Login tem de ter ao menos 7 caracteres.' })
  email: string;

  @ApiProperty()
  @IsBoolean({ message: 'Valor inválido.' })
  dev?: boolean;

  @ApiProperty()
  @IsNumber({}, { message: 'Status inválido!' })
  status?: number;

  @ApiProperty()
  @IsString({ message: 'Status inválido!' })
  unidade_id?: string;

  @ApiProperty()
  @IsArray({ message: 'Selecione os sistemas!' })
  sistemas?: PermissaoSistema[];
}
