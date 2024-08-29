import { PartialType } from '@nestjs/mapped-types';
import { CreateAvisoDto } from './create-aviso.dto';
import { CorModalAviso } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAvisoDto extends PartialType(CreateAvisoDto) {
    @ApiProperty()
    titulo: string;
    @ApiProperty()
    mensagem: string;
    @ApiProperty()
    cor: CorModalAviso;
    @ApiProperty()
    rota: string;
    @ApiProperty()
    status?: boolean;
    @ApiProperty()
    tipo_id?: string;
}
