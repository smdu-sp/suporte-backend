import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateOrdemDto {
    @IsString({ message: 'Unidade inválida!' })
    unidade_id: string;

    @IsNumber({}, { message: 'Andar inválido!' })
    andar: number;

    @IsString({ message: 'Sala inválida!' })
    sala: string;

    @IsNumber({}, { message: 'Tipo inválido!' })
    tipo_id: string;

    @IsString({ message: 'É necessário descrever o problema a receber o serviço!' })
    observacoes: string;

    @IsString({ message: 'Campo telefone é obrigatório!' })
    telefone: string;

    @IsString({ message: 'Você deve inserir um nome para tratar com!' })
    tratar_com?: string;

    @IsNumber({}, { message: 'Nivel de prioridade inválido!' })
    prioridade?: number;

    @IsString({ message: 'Categoria inválida!' })
    categoria_id: string;

    @IsString({ message: 'Categoria inválida!' })
    subcategoria_id: string;
}
