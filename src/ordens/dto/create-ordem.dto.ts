import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateOrdemDto {
    @ApiProperty()
    @IsString({ message: 'Unidade inválida!' })
    unidade_id: string;

    @ApiProperty()
    @IsNumber({}, { message: 'Andar inválido!' })
    andar: number;

    @ApiProperty()
    @IsString({ message: 'Sala inválida!' })
    sala: string;

    @ApiProperty()
    @IsNumber({}, { message: 'Tipo inválido!' })
    tipo_id: string;

    @ApiProperty()
    @IsString({ message: 'É necessário descrever o problema a receber o serviço!' })
    observacoes: string;
    
    @ApiProperty()
    @IsString({ message: 'Campo telefone é obrigatório!' })
    telefone: string;

    @ApiProperty()
    @IsString({ message: 'Você deve inserir um nome para tratar com!' })
    tratar_com?: string;

    @ApiProperty()
    @IsNumber({}, { message: 'Nivel de prioridade inválido!' })
    prioridade?: number;

    @ApiProperty()
    @IsString({ message: 'Categoria inválida!' })
    categoria_id: string;

    @ApiProperty()
    @IsString({ message: 'Categoria inválida!' })
    subcategoria_id: string;
}
