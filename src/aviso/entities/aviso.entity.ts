import { CorModalAviso } from "@prisma/client"

export class Aviso {
    id?: string;
    titulo: string;
    mensagem: string;
    cor: CorModalAviso;
    rota: string;
    status: boolean;
    sistema_id: string;
}
