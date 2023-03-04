import { Controller, Post, Get, Body, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService){}
  @UseGuards(JwtAuthGuard)
  @Post()
  createGroup(@Body() groupDto: CreateGroupDto){
    return this.groupService.createGroup(groupDto)
  }
  @UseGuards(JwtAuthGuard)
  @Get('/for_user/:id')
  getAllForUser(@Param() param: Object ){
    return this.groupService.getAllForUser(param["id"])
  }
  @UseGuards(JwtAuthGuard)
  @Get('/for_id/:id')
  getById(@Param() param: Object){
    return this.groupService.getById(param["id"])
  }
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateGroup(@Param() param: Object, @Body() groupDto: CreateGroupDto){
    return this.groupService.updateGroup(param["id"], groupDto)
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteGroup(@Param() param: Object){
    return this.groupService.deleteGroup(param["id"])
  }
}
