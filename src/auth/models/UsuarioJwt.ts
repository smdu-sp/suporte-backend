import { ApiProperty } from "@nestjs/swagger";

export class UsuarioJwt {
  @ApiProperty()
  id: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  nome: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  status: number;
  @ApiProperty()
  dev: boolean;
  @ApiProperty()
  avatar: string;
}
