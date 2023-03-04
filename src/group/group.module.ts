import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { BlockListModule } from 'src/block-list/block-list.module';
import { Todo } from 'src/todo/todo.model';
import { User } from 'src/users/users.model';
import { GroupController } from './group.controller';
import { Group } from './group.model';
import { GroupService } from './group.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [
    SequelizeModule.forFeature([User, Group, Todo]),
    AuthModule,
    BlockListModule
  ],
  exports: [
    GroupService
  ]
})
export class GroupModule {}
