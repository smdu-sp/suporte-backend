import { ApiProperty } from "@nestjs/swagger";

export class AvaliarServicoDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    status: number;
    @ApiProperty()
    observacao?: string;
}
