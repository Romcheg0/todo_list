import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BlockListModule } from 'src/block-list/block-list.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(()=>UsersModule), 
    JwtModule.register(
      {
        signOptions: {
          expiresIn: '1h'
        }
      }
    ),
    BlockListModule
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
