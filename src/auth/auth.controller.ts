import { IncomingHttpHeaders } from 'http';
import { Controller, Get, Post, Body, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

import { GetUser, RoleProtected, Auth, GetRawHeaders } from './decorators'
// import { GetUser } from './decorators/get-user.decorator';
// import { GetRawHeaders } from './decorators/get-rawHeaders.decorator'; // En teoria deberia ir en los common porque es mas generico

import { User } from './entities/user.entity';

import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkTokenUser(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user);
  }

}
