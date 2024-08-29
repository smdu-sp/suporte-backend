import { ApiProperty } from "@nestjs/swagger";

export class AdicionarSuspensaoDto {
    @ApiProperty()
    motivo: string;
}
  