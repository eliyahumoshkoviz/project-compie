import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtSupport } from 'src/support/jwt.support';

interface DecodedToken {
  role_id: number;
}

function isDecodedToken(obj: any): obj is DecodedToken {
  return obj && typeof obj.role_id === 'number';
}

export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authHeader = context.switchToHttp().getRequest().headers.authorization;  
    if (!authHeader) throw new UnauthorizedException('No token provided');
    const decoded = await JwtSupport.decodeToken(authHeader);
    if (isDecodedToken(decoded)) {
      if (decoded.role_id > 2) return true;
      throw new UnauthorizedException('Insufficient role permissions');
    }
    throw new UnauthorizedException('Invalid token format');
  }
}
