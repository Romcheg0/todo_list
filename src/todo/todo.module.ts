import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { BlockListModule } from 'src/block-list/block-list.module';
import { GroupModule } from 'src/group/group.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Group } from 'src/group/group.model';
import { User } from 'src/users/users.model';
import { Todo } from './todo.model';

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
