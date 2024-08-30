import { ApiProperty } from "@nestjs/swagger";
import { Permissao } from "@prisma/client";

export class UsuarioSistemaResponseDTO {
    @ApiProperty({
        type: String,
        title: 'O ID do usuário.'
    })
    usuario_id: string;
    @ApiProperty({
        type: String,
        title: 'O ID do sistema.'
    })
    sistema_id: string;
    @ApiProperty({
        type: () => Permissao,
        enum: ['ADM', 'TEC', 'USR'],
        title: 'A permissão do usuário dentro desse sistema.'
    })
    permissao: Permissao
}
