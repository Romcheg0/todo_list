import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.model';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group) private groupRepository: typeof Group){}

  async createGroup(dto: CreateGroupDto){
    try{
      const group = await this.groupRepository.create(dto)
      return group
    }
    catch(e){
      throw new BadRequestException({message: "No user with such id"})
    }

  }
  async getAllForUser(id: number){
    try{     
      const groups = await this.groupRepository.findAll({where: {userId: id}})
      if(groups.length){
        return groups
      }
      else{
        throw new BadRequestException({message: "No user with such id"})
      }
    }
    catch(e){
      throw new BadRequestException({message: "No user with such id"})
    }
  }
  async getById(id){
    try{
      const group = await this.groupRepository.findOne({where: {id}})
      if(group){
        return group
      }
      else{
        throw new BadRequestException({message: "No group with such ID"})
      }
    }
    catch(e){
      throw new BadRequestException({message: "No group with such ID"})
    }
  }
  async updateGroup(id: number, dto: CreateGroupDto){
    try{
      await this.groupRepository.update({name: dto.name, userId: dto.userId}, {where: {id}})
      return this.getById(id)
    }
    catch(e){
      throw new BadRequestException({message: "No group or user with such ID"})
    }
  }
  async deleteGroup(id: number){
    try{
      if(!await this.getById(id)){
        throw new BadRequestException({messasge: "No group with such ID"})
      }
      await this.groupRepository.destroy({where: {id}})
      return true
    }
    catch(e){
      throw new BadRequestException({message: "No group with such ID"})
    }
  }
}
