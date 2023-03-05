import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateSubtaskDto } from './dto/subtask.dto';
import { SubtaskService } from './subtask.service';

@Controller('subtasks')
export class SubtaskController {
  constructor(private subtaskService: SubtaskService){}
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  createSubtask(@Body() dto: CreateSubtaskDto){
    return this.subtaskService.createSubtask(dto)
  }
  @UseGuards(JwtAuthGuard)
  @Get('/for_id/:id')
  getById(@Param() param: Object){
    return this.subtaskService.getById(param["id"])
  }
  @UseGuards(JwtAuthGuard)
  @Get('/for_task/:id')
  getAllForTask(@Param() param: Object){
    return this.subtaskService.getAllForTask(param["id"])
  }
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/:id')
  updateSubtask(@Param() param: Object, @Body() dto: CreateSubtaskDto){
    return this.subtaskService.updateSubtask(param["id"], dto)
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteSubtask(@Param() param: Object){
    return this.subtaskService.deleteSubtask(param["id"])
  }
}
