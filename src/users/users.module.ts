import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import {SequelizeModule} from "@nestjs/sequelize"
import { User } from './users.model';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { BlockListModule } from 'src/block-list/block-list.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(()=>AuthModule),
    BlockListModule
  ],
  exports: [UsersService,  ]
})
export class UsersModule {}
