import { ApiProperty } from "@nestjs/swagger"
import { Permissao } from "@prisma/client"

export class CreateUsuarioSistemaDto {
    @ApiProperty()
    usuario_id: string
    @ApiProperty()
    sistema_id: string
    @ApiProperty()
    permissao?: Permissao
}
