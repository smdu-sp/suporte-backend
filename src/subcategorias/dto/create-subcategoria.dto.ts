import { ApiProperty } from "@nestjs/swagger"

export class CreateSubcategoriaDto {
    @ApiProperty()
    nome: string;
    @ApiProperty()
    categoria_id: string;
    @ApiProperty()
    status?: boolean;
}
