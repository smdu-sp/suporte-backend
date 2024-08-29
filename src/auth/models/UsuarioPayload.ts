import { ApiProperty } from "@nestjs/swagger";

export class UsuarioPayload {
  @ApiProperty()
  sub: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  nome: string;
  @ApiProperty()
  dev: boolean;
  @ApiProperty()
  status: number;
  @ApiProperty()
  iat?: number;
  @ApiProperty()
  exp?: number;
}
