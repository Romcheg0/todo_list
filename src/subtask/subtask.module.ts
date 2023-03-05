import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { BlockListModule } from 'src/block-list/block-list.module';
import { SubtaskController } from './subtask.controller';
import { SubtaskService } from './subtask.service';
import { Subtask } from './subtask.model';

@Module({
  providers: [SubtaskService],
  imports: [
    SequelizeModule.forFeature([Subtask]),
    AuthModule,
    BlockListModule
  ],
  controllers: [SubtaskController]
})
export class SubtaskModule {}
