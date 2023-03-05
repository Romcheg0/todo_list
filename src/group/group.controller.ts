import { Controller, Post, Get, Body, UseGuards, Param, Put, Delete, UsePipes } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.model';
import { GroupService } from './group.service';

@ApiTags("Groups")
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService){}
  
  @ApiOperation({summary: "Group creation"})
  @ApiOkResponse({status: 200, type: Group, description: "Created group"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Non authorized access"})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  createGroup(@Body() groupDto: CreateGroupDto){
    return this.groupService.createGroup(groupDto)
  }

  @ApiOperation({summary: "Groups retrieval by user id"})
  @ApiOkResponse({status: 200, type: [Group], description: "List of groups for provided user"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Non authorized access"})
  @UseGuards(JwtAuthGuard)
  @Get('/for_user/:id')
  getAllForUser(@Param() param: Object ){
    return this.groupService.getAllForUser(param["id"])
  }

  @ApiOperation({summary: "Group retrieval by id"})
  @ApiOkResponse({status: 200, type: Group, description: "Groups with provided ID"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Non authorized access"})
  @UseGuards(JwtAuthGuard)
  @Get('/for_id/:id')
  getById(@Param() param: Object){
    return this.groupService.getById(param["id"])
  }
  @ApiOperation({summary: "Group updation by id"})
  @ApiOkResponse({status: 200, type: Group, description: "Updated Group"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Non authorized access"})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/:id')
  updateGroup(@Param() param: Object, @Body() groupDto: CreateGroupDto){
    return this.groupService.updateGroup(param["id"], groupDto)
  }
  @ApiOperation({summary: "Group deletion by id"})
  @ApiOkResponse({status: 200, type: Group, description: "Deleted Group"})
  @ApiBadRequestResponse({status: 400, type: String, description: "Bad data provided"})
  @ApiUnauthorizedResponse({status: 400, type: String, description: "Non authorized access"})
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteGroup(@Param() param: Object){
    return this.groupService.deleteGroup(param["id"])
  }
}
