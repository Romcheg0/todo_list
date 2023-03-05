import { forwardRef, Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize"
import { AuthModule } from 'src/auth/auth.module';
import { BlockListModule } from 'src/block-list/block-list.module';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Group } from 'src/group/group.model';
import { Todo } from 'src/todo/todo.model';

@Module({
  controllers: [],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Group, Todo]),
    forwardRef(()=>AuthModule),
    BlockListModule,
  ],
  exports: [UsersService,]
})
export class UsersModule {}
