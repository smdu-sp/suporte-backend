import { ApiProperty } from "@nestjs/swagger";
import { Permissao } from "@prisma/client";

export class CreateUsuarioTipoDto {
    @ApiProperty()
    usuario_id: string;
    @ApiProperty()
    tipo_id: string;
    @ApiProperty()
    permissao?: Permissao
}
