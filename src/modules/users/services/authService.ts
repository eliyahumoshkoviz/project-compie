import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { scrypt as _scrypt, randomBytes } from 'crypto'
import { promisify } from 'util';
import { JwtSupport } from 'src/support/jwt.support';
import { Users } from '../models/domain/user.entity';
const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }

  async signup(email: string, password: string, username: string) {
    if ((await this.userService.find(email)).length) throw new BadRequestException('email is use')
    const salt = randomBytes(8).toString('hex')
    const hash = await scrypt(password, salt, 32) as Buffer
    const result = salt + '.' + hash.toString('hex')
    const user = await this.userService.create(email, result, username) as Users
    const token = await JwtSupport.createJwt(`${process.env.JWT_SECRET}`, { userId: user.id, role_id: user.role_id }, { expiresIn: '1h' });
    return { user, token };
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) throw new NotFoundException('User not found');
    const [salt, storedHash] = user.password.split('.')
    const hash = await scrypt(password, salt, 32) as Buffer
    if (storedHash !== hash.toString('hex')) throw new BadRequestException('bad passvord')
    const token = await JwtSupport.createJwt(`${process.env.JWT_SECRET}`, { userId: user.id, role_id: user.role_id }, { expiresIn: '1h' });
    return { user, token };
  }

  async findUserByCookieService(id: number) {
    const [user] = await this.userService.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user
  }
}