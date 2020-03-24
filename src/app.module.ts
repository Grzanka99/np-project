import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { User } from './entities/user.entitie';
import data from '../data.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: data.host,
      port: 3306,
      username: data.username,
      password: data.password,
      database: data.db,
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
