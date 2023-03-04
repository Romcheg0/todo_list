import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService){}

  @Post()
    create(@Body() userDto: CreateUserDto){
      return this.usersService.createUser(userDto)
    }
  @UseGuards(JwtAuthGuard)
  @Get()
    getAll(){
      return this.usersService.getAllUsers()
    }
}