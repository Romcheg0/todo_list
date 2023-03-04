import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { BlockList } from './block-list.model';
import { BlockListService } from './block-list.service';

@Module({
  providers: [BlockListService],
  imports:[
    SequelizeModule.forFeature([BlockList]),
    forwardRef(()=>AuthModule),
  ],
  exports: [BlockListService]
})
export class BlockListModule {}
