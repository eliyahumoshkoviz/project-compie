import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/authentication/dto/admin.guard';
import { AuthGuard } from 'src/guards/authentication/dto/auth.guard copy';
import { CreateUserDto } from 'src/modules/users/models/dto/create-user.dto';
import { LoginUserDto } from 'src/modules/users/models/dto/login-user.dto copy';
import { UpdateUserDto } from 'src/modules/users/models/dto/update-user.dto';
import { AuthService } from 'src/modules/users/services/authService';
import { UsersService } from 'src/modules/users/services/users.service';

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
  @UseGuards(AuthGuard)
  async getAllUsers() {
    return this.usersService.find();
  }

  @Get('/single/:id')
  @UseGuards(AuthGuard)
  async findUserById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body)
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  removeUser(@Param('id') id: number) {
    return this.usersService.remove(id)
  }

}
