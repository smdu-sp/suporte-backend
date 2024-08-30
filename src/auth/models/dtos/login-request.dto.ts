import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
    @ApiProperty({
        description: 'Username do login',
        example: 'x123456',
    })
    login: string;
    @ApiProperty({
        description: 'A sua senha',
        example: 'senha123',
    })
    senha: string;
}
