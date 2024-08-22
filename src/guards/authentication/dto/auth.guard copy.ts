import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtSupport } from 'src/support/jwt.support';

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const authHeader = context.switchToHttp().getRequest().headers.authorization;  
    if (!authHeader) throw new UnauthorizedException('No token provided');
    const decoded = await JwtSupport.decodeToken(authHeader);
    if (!decoded) throw new UnauthorizedException('Invalid token');    
    return true;
  }
}
