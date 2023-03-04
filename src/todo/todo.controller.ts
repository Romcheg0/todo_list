import { Body, Controller, UseGuards, Post, Get, Param, Put } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService){}
  // @UseGuards(JwtAuthGuard)
  @Post()
  createTodo(@Body() dto: CreateTodoDto){
    return this.todoService.createTodo(dto)
  }
  // @UseGuards(JwtAuthGuard)
  @Get('/for_id/:id')
  getById(@Param() param: Object){
    return this.todoService.getById(param["id"])
  }
  // @UseGuards(JwtAuthGuard)
  @Get('/for_user/:id')
  getAllForUser(@Param() param: Object){
    return this.todoService.getAllForUser(param["id"])
  }
  // @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateTodo(@Param() param: Object, @Body() dto: CreateTodoDto){
    return this.todoService.updateTodo(param["id"], dto)
  }
  // @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteTodo(@Param() param: Object){
    return this.todoService.deleteTodo(param["id"])
  }
}
