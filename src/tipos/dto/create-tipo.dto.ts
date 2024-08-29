import { ApiProperty } from "@nestjs/swagger"

export class CreateTipoDto {
    @ApiProperty()
    nome: string;
    @ApiProperty()
    status?: boolean
}
