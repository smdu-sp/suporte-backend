export interface UsuarioPayload {
  sub: string;
  login: string;
  email: string;
  nome: string;
  dev: boolean;
  status: number;
  iat?: number;
  exp?: number;
}
