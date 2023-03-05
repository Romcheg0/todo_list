import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User){}

  async createUser(dto: CreateUserDto){
    try{
      if(!dto){
        throw new BadRequestException({message: "Bad data for user"})
      }
      const user = await this.userRepository.create(dto)
      return user
    }
    catch(e){
      throw new BadRequestException({message: "Bad data for user"})
    }
  }
  async getAllUsers(){
    const users = await this.userRepository.findAll()
    return users
  }
  async getUserByUserName(username: string){
    try{
      const user = await this.userRepository.findOne({where: {username}})
      return user
    }
    catch(e){
      throw new BadRequestException({message: "No users with such username"})
    }
  }
}
