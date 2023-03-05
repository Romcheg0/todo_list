import { Controller, Post, Body, UseGuards, Headers, UsePipes} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto){
    return this.authService.registration(userDto)
  }
  @Post('/login')
  login(@Body() userDto: CreateUserDto){
    return this.authService.login(userDto)
  }
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@Headers() headers){
      const authHeader = headers.authorization
      const token = authHeader.split(' ')[1]
      return this.authService.logout(token)
  }
  @Post('/refresh')
  refresh(@Headers() headers){
    const authToken = headers.authorization
    const refreshToken = headers.refresh
    return this.authService.refresh(authToken, refreshToken)
  }
}
