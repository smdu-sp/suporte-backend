import { ApiProperty } from "@nestjs/swagger"

export class CreateCategoriaDto {
    @ApiProperty()
    nome: string;
    @ApiProperty()
    tipo_id: string;
    @ApiProperty()
    status?: boolean;
}
