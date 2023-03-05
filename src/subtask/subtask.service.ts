import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSubtaskDto } from './dto/subtask.dto';
import { Subtask } from './subtask.model';


@Injectable()
export class SubtaskService {
  constructor(@InjectModel(Subtask) private subtaskRepository: typeof Subtask){}
  async createSubtask(dto: CreateSubtaskDto){
    try{     
      const subtask = await this.subtaskRepository.create(dto)     
      return subtask
    }
    catch(e){
      throw new BadRequestException({message: "No tasks with such id"})
    }
  }
  async getById(id){
    try{
      const subtask = await this.subtaskRepository.findOne({where: {id}})
      if(subtask){
        return subtask
      }
      else{
        throw new BadRequestException({message: "No subtasks with such ID"})
      }
    }
    catch(e){
      throw new BadRequestException({message: "No subtasks with such ID"})
    }
  }
  async getAllForTask(id){
    try {
      const subtasks = await this.subtaskRepository.findAll({where: {todoId: id}})
      if(subtasks.length){
        return subtasks
      }
      else{
        throw new BadRequestException({message: "No tasks with such ID"})
      }
    } catch (e) {
      throw new BadRequestException({message: "No tasks with such ID"})
    }
  }
  async updateSubtask(id, dto: CreateSubtaskDto){
    try{
      await this.subtaskRepository.update(
        {
          text: dto.text,
          isCompleted: dto.isCompleted,
          todoId: dto.todoId
        }, 
        {where: {id}}
      )
      return this.getById(id)
    }
    catch(e){
      throw new BadRequestException({message: "No tasks or subtasks with such ID"})
    }
  }
  async deleteSubtask(id){
    try{
      if(!await this.getById(id)){
        throw new BadRequestException({messasge: "No subtasks with such ID"})
      }
      await this.subtaskRepository.destroy({where: {id}})
      return true
    }
    catch(e){
      throw new BadRequestException({message: "No subtasks with such ID"})
    }
  }
}
