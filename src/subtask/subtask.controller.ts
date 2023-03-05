import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateSubtaskDto } from './dto/subtask.dto';
import { Subtask } from './subtask.model';
import { SubtaskService } from './subtask.service';

@ApiTags("Subtasks")
@Controller('subtasks')
export class SubtaskController {

  constructor(private subtaskService: SubtaskService){}

  @ApiOperation({summary: "Create the subtask"})
  @ApiCreatedResponse({status: 200, type: Subtask, description: "Created subtask"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Unauthorized access"})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  createSubtask(@Body() dto: CreateSubtaskDto){
    return this.subtaskService.createSubtask(dto)
  }

  @ApiOperation({summary: "Get the subtask by id"})
  @ApiCreatedResponse({status: 200, type: Subtask, description: "Subtask with provided ID"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Unauthorized access"})
  @UseGuards(JwtAuthGuard)
  @Get('/for_id/:id')
  getById(@Param() param: Object){
    return this.subtaskService.getById(param["id"])
  }

  @ApiOperation({summary: "Get the subtasks by task ID"})
  @ApiCreatedResponse({status: 200, type: [Subtask], description: "Subtasks for the task with provided ID"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Unauthorized access"})
  @UseGuards(JwtAuthGuard)
  @Get('/for_task/:id')
  getAllForTask(@Param() param: Object){
    return this.subtaskService.getAllForTask(param["id"])
  }

  @ApiOperation({summary: "Update the subtask by ID"})
  @ApiCreatedResponse({status: 200, type: Subtask, description: "Updated subtask"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Unauthorized access"})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/:id')
  updateSubtask(@Param() param: Object, @Body() dto: CreateSubtaskDto){
    return this.subtaskService.updateSubtask(param["id"], dto)
  }

  @ApiOperation({summary: "Delete the subtask by ID"})
  @ApiCreatedResponse({status: 200, type: Subtask, description: "Deleted subtask"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Unauthorized access"})
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteSubtask(@Param() param: Object){
    return this.subtaskService.deleteSubtask(param["id"])
  }
}
