import { Permissao } from "@prisma/client";

export interface CreateUsuarioTipoDto {
    id_usuario: string,
    id_tipo: string,
    permissao?: Permissao
}
