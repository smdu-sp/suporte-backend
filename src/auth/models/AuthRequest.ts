import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from '@prisma/client';
import { Request } from 'express';

export class AuthRequest extends Request {
  @ApiProperty()
  user: Usuario;
}
