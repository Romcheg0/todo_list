import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { BlockListModule } from 'src/block-list/block-list.module';
import { Group } from 'src/group/group.model';
import { GroupModule } from 'src/group/group.module';
import { User } from 'src/users/users.model';
import { TodoController } from './todo.controller';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [
    SequelizeModule.forFeature([Todo, User, Group]),
    AuthModule,
    BlockListModule,
    GroupModule
  ]
})
export class TodoModule {}
