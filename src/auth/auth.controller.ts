import { Controller, Post, Body, UseGuards, Headers, UsePipes} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BlockList } from 'src/block-list/block-list.model';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';

@ApiTags('Authorization and registration')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @ApiOperation({summary: "User registration (creation)"})
  @ApiCreatedResponse({status: 200, type: User, description: "Created user"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided for user", })
  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto){
    return this.authService.registration(userDto)
  }

  @ApiOperation({summary: "User authorization (login)"})
  @ApiOkResponse({status: 200, type: Object, description: "Object with access & refresh tokens"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided for user"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Non authorized access"})
  @Post('/login')
  login(@Body() userDto: CreateUserDto){
    return this.authService.login(userDto)
  }

  @ApiOperation({summary: "User logout"})
  @ApiOkResponse({status: 200, type: BlockList, description: "Blocked JWT token"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided for user"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Non authorized access"})
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@Headers() headers){
      const authHeader = headers.authorization
      const token = authHeader.split(' ')[1]
      return this.authService.logout(token)
  }

  @ApiOperation({summary: "User access & refresh tokens updating"})
  @ApiOkResponse({status: 200, type: Object, description: "Object with new access & refresh tokens"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Bad tokens data"})
  @Post('/refresh')
  refresh(@Headers() headers){
    const authToken = headers.authorization
    const refreshToken = headers.refresh
    return this.authService.refresh(authToken, refreshToken)
  }
}
