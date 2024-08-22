import { Body, Controller, Get, Headers, Param, Post, Session, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/models/dto/create-user.dto';
import { LoginUserDto } from 'src/modules/users/models/dto/login-user.dto copy';
import { AuthService } from 'src/modules/users/services/authService';
import { UsersService } from 'src/modules/users/services/users.service';
import { JwtSupport } from 'src/support/jwt.support';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) { }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const { user, token } = await this.authService.signup(body.email, body.password, body.username);
    session.userId = user.id;
    return { user, token }
  }
  @Post('/signin')
  async signin(@Body() body: LoginUserDto, @Session() session: any) {
    const { user, token } = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return { user, token }
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null
  }

  @Get('/findUserByCookie')
  async findUserByCookie(@Session() session: any) {
    return this.authService.findUserByCookieService(session.userId)
  }

  @Get()
  async getAllUsers(@Headers('Authorization') token: string) {
    const decoded = await JwtSupport.decodeToken(token);
    if (!decoded) throw new UnauthorizedException('Invalid token');
    return this.usersService.find();
  }

  @Get('/single/:id')
  async findUserById(@Headers('Authorization') token: string, @Param('id') id: number) {
    const decoded = await JwtSupport.decodeToken(token);
    if (!decoded) throw new UnauthorizedException('Invalid token');
    return this.usersService.findById(id);
  }
}
