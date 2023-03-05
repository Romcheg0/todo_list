import { Body, Controller, UseGuards, Post, Get, Param, Put, Delete, UsePipes } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@ApiTags("Todos")
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService){}

  @ApiOperation({summary: "Todo creation"})
  @ApiCreatedResponse({status: 200, type: Todo, description: "Created todo"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Non authorized access"})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  createTodo(@Body() dto: CreateTodoDto){
    return this.todoService.createTodo(dto)
  }

  @ApiOperation({summary: "Get todo by id"})
  @ApiOkResponse({status: 200, type: Todo, description: "Todo with provided ID"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Non authorized access"})
  @UseGuards(JwtAuthGuard)
  @Get('/for_id/:id')
  getById(@Param() param: Object){
    return this.todoService.getById(param["id"])
  }

  @ApiOperation({summary: "Get todos by user id"})
  @ApiOkResponse({status: 200, type: [Todo], description: "Todos for user with provided ID"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Non authorized access"})
  @UseGuards(JwtAuthGuard)
  @Get('/for_user/:id')
  getAllForUser(@Param() param: Object){
    return this.todoService.getAllForUser(param["id"])
  }

  @ApiOperation({summary: "Update todo by id"})
  @ApiOkResponse({status: 200, type: Todo, description: "Updated todo"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Non authorized access"})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/:id')
  updateTodo(@Param() param: Object, @Body() dto: CreateTodoDto){
    return this.todoService.updateTodo(param["id"], dto)
  }

  @ApiOperation({summary: "Delete todo by id"})
  @ApiOkResponse({status: 200, type: Todo, description: "Deleted todo"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Non authorized access"})
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteTodo(@Param() param: Object){
    return this.todoService.deleteTodo(param["id"])
  }
}
