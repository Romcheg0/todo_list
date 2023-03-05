import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { BlockListService } from './block-list.service';
import { BlockList } from './block-list.model';

@Module({
  providers: [BlockListService],
  imports:[
    SequelizeModule.forFeature([BlockList]),
    forwardRef(()=>AuthModule),
  ],
  exports: [BlockListService]
})
export class BlockListModule {}
