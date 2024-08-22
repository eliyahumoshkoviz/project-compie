import { UnauthorizedException } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';

export const JwtSupport = {
  async createJwt(
    cert: string | Buffer,
    payLoad: Record<string, unknown>,
    signObject: jsonwebtoken.SignOptions,
  ): Promise<string> {
    try {
      return jsonwebtoken.sign(payLoad, cert, signObject);
    } catch {
      return null;
    }
  },

  async decodeToken(token: string): Promise<{ [p: string]: unknown } | string> {
    const t = token?.split(' ')[1];
    if (!t) throw new UnauthorizedException('No or invalid Authorization header provided');
    return jsonwebtoken.decode(t);
  },
};
