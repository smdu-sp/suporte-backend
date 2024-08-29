import { ApiProperty } from "@nestjs/swagger"

export class CreateSistemaDto {
    @ApiProperty()
    nome: string;
    @ApiProperty()
    padrao: boolean
    @ApiProperty()
    status: boolean
}
