import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { BlockListService } from 'src/block-list/block-list.service';
@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService, private blockListService: BlockListService){}

  async registration(userDto: CreateUserDto){
    const candidate = await this.userService.getUserByUserName(userDto.username)
    if(candidate){
      throw new HttpException('User with such username is already exist', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({...userDto, password: hashPassword})
    return user
  }
  async login(userDto: CreateUserDto){
    const user = await this.validateUser(userDto)
    return this.generateTokens(user)
  }
  async logout(token: string){
    const blockedToken = await this.blockListService.createBlockList(token)
    return blockedToken
  }
  async refresh(authToken: string, refreshToken: string){
    try{
      const data = this.jwtService.decode(refreshToken)
      const payload = {
        id: data["id"],
        username: data["username"]
      }
      this.logout(authToken.split(' ')[1])
      return {
        accessToken: this.jwtService.sign(payload, {secret: process.env.ACCESS_PRIVATE_KEY, expiresIn: "15m"}),
        refreshToken: this.jwtService.sign(payload, {secret: process.env.REFRESH_PRIVATE_KEY, expiresIn: "15d"})
      }
    }
    catch(e){
      throw new UnauthorizedException({message: 'Refresh time was expired, log in once again'})
    }
  }
  private async generateTokens(user: User){
    const payload = {id: user.id, username: user.username}
    return {
      accessToken: this.jwtService.sign(payload, {secret: process.env.ACCESS_PRIVATE_KEY, expiresIn: "15m"}),
      refreshToken: this.jwtService.sign(payload, {secret: process.env.REFRESH_PRIVATE_KEY, expiresIn: "15d"})
    }
  }
  private async validateUser(userDto: CreateUserDto){
    const user = await this.userService.getUserByUserName(userDto.username)
    if(!user){
      throw new UnauthorizedException({message: 'Incorrect username'})
    }
    const isPasswordEquals = await bcrypt.compare(userDto.password, user.password)
    if(user && isPasswordEquals){
      return user
    }
    throw new UnauthorizedException({message: 'Incorrect password'})
  }
}
