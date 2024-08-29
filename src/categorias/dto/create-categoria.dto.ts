import { ApiProperty } from "@nestjs/swagger"

export class CreateCategoriaDto {
    @ApiProperty()
    nome: string;
    @ApiProperty()
    sistema_id: string;
    @ApiProperty()
    status?: boolean;
}
