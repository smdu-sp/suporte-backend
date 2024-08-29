import { ApiProperty } from "@nestjs/swagger";
import { CorModalAviso } from "@prisma/client"

export class Aviso {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    titulo: string;
    @ApiProperty()
    mensagem: string;
    @ApiProperty()
    cor: CorModalAviso;
    @ApiProperty()
    rota: string;
    @ApiProperty()
    status: boolean;
    @ApiProperty()
    sistema_id: string;
}
