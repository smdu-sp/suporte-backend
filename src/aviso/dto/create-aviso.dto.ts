import { CorModalAviso } from "@prisma/client";

export class CreateAvisoDto {
    titulo: string;
    mensagem: string;
    cor: CorModalAviso;
    rota: string;
    status?: boolean;
    sistema_id: string;
}
