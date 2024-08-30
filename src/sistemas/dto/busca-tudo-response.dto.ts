import { ApiProperty } from "@nestjs/swagger";
import { Sistema } from "@prisma/client";

export class BuscaTudoResponseDTO {
    @ApiProperty({
        title: 'Total de objetos carregados',
        type: Number
    })
    total: number;
    @ApiProperty({
        title: 'Total de páginas',
        type: Number
    })
    pagina: number;
    @ApiProperty({
        title: 'Limite de objetos por requisição.',
        type: Number
    })
    limite: number;
    @ApiProperty({
        title: 'Total de objetos carregados',
        type: Object
    })
    data: Sistema[]
}
