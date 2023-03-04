import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GroupService } from 'src/group/group.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoRepository: typeof Todo, private groupService: GroupService){}
  async createTodo(dto: CreateTodoDto){
    try{     
      if(!dto.hasOwnProperty("groupId")){        
        let notSortedGroup = await (await this.groupService.getAllForUser(dto.userId))
        .find(item=>item.name === "Not sorted")
        if(!notSortedGroup){
          const newGroup = await this.groupService.createGroup({"name": "Not sorted", "userID": dto.userId})
          notSortedGroup = newGroup
        }
        dto.groupId = notSortedGroup.id
      }
      const todo = await this.todoRepository.create(dto)     
      return todo
    }
    catch(e){
      throw new BadRequestException({message: "No users or groups with such ids"})
    }
  }
  async getById(id){
    try{
      const todo = await this.todoRepository.findOne({where: {id}})
      if(todo){
        return todo
      }
      else{
        throw new BadRequestException({message: "No tasks with such ID"})
      }
    }
    catch(e){
      throw new BadRequestException({message: "No tasks with such ID"})
    }
  }
  async getAllForUser(id){
    try {
      const todos = await this.todoRepository.findAll({where: {userId: id}})
      if(todos){
        return todos
      }
      else{
        throw new BadRequestException({message: "No users with such ID"})
      }
    } catch (e) {
      throw new BadRequestException({message: "No users with such ID"})
    }
  }
  async updateTodo(id, dto: CreateTodoDto){
    try{
      let updateData = {
        text: dto.text, 
        isCompleted: dto.isCompleted, 
        userId: dto.userId.toString(), 
      }
      if(dto.hasOwnProperty("groupId")){
        updateData["groupId"] = dto.groupId
      }
      const todo = await this.todoRepository.update(
        updateData, 
        {where: {id}}
        )
      return this.getById(id)
    }
    catch(e){
      throw new BadRequestException({message: "No entities with such ID"})
    }
  }
  async deleteTodo(id){
    try{
      if(!await this.getById(id)){
        throw new BadRequestException({messasge: "No tasks with such ID"})
      }
      await this.todoRepository.destroy({where: {id}})
      return true
    }
    catch(e){
      throw new BadRequestException({message: "No tasks with such ID"})
    }
  }
}
