import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

import { GetUser, Auth } from './decorators'

import { User } from './entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

  @Get('users')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.authService.getUsers( paginationDto );
  }

  @Get('check-status')
  @Auth()
  checkTokenUser(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user);
  }

}
