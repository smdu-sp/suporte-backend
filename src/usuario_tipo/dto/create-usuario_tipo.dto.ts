import { Permissao } from "@prisma/client";

export interface CreateUsuarioTipoDto {
    // id: string,
    id_usuario: string,
    id_tipo: string,
    permissao?: Permissao
}
