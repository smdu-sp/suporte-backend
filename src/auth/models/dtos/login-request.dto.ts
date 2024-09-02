import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
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
