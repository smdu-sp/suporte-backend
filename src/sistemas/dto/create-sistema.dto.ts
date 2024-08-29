<<<<<<< HEAD:src/tipos/dto/create-tipo.dto.ts
import { ApiProperty } from "@nestjs/swagger"

export class CreateTipoDto {
    @ApiProperty()
    nome: string;
    @ApiProperty()
=======
export class CreateSistemaDto {
    nome: string
>>>>>>> 09c92e9fd1120d2017a8306ea6c1198eb6d38dff:src/sistemas/dto/create-sistema.dto.ts
    status?: boolean
}
