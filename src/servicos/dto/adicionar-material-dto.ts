import { ApiProperty } from "@nestjs/swagger";

export class AdicionarMaterialDto {
    @ApiProperty()
    nome: string;
    @ApiProperty()
    quantidade: number;
    @ApiProperty()
    medida: string;
}
