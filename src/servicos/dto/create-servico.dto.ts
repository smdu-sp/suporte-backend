import { ApiProperty } from "@nestjs/swagger";

export class CreateServicoDto {
  @ApiProperty()
  tecnico_id?: string;
  @ApiProperty()
  descricao?: string;
  @ApiProperty()
  ordem_id: string;
  @ApiProperty()
  prioridade: number;
}
