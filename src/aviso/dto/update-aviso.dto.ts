import { PartialType } from '@nestjs/mapped-types';
import { CreateAvisoDto } from './create-aviso.dto';
import { CorModalAviso } from '@prisma/client';

export class UpdateAvisoDto extends PartialType(CreateAvisoDto) {
    titulo: string;
    mensagem: string;
    cor: CorModalAviso;
    rota: string;
    status?: boolean;
    tipo_id?: string;
}
