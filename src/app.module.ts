import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BlockListModule } from './block-list/block-list.module';
import { TodoModule } from './todo/todo.module';
import { GroupModule } from './group/group.module';
import { Group } from './group/group.model';
import { Todo } from './todo/todo.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({envFilePath: '.env'}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [User, Group, Todo],
      autoLoadModels: true
    }),
    UsersModule,
    AuthModule,
    BlockListModule,
    TodoModule,
    GroupModule,
  ]
})
export class AppModule {}
