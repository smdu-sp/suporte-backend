import { Permissao } from "@prisma/client"

export class CreateUsuarioSistemaDto {
    usuario_id: string
    sistema_id: string
    permissao?: Permissao
}
