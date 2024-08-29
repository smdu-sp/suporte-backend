import { ApiProperty } from "@nestjs/swagger"

export class CreateSistemaDto {
    @ApiProperty()
    nome: string;
    @ApiProperty()
    status?: boolean
}
