import { Permissao } from "@prisma/client";

export interface CreateUsuarioTipoDto {
    usuario_id: string,
    tipo_id: string,
    permissao?: Permissao
}
