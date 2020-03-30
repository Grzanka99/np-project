import { AppService } from './app.service';
import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './app.entitie';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('pages/asd')
  index(): object {
    return {};
  }

  @Get('/register')
  register(): string {
    return 'Rejestracja';
  }

  @Post('/register')
  async show(@Body() createUserDto: CreateUserDto): Promise<object> {
    return await this.appService.createUser(createUserDto);
  }

  @Get('/all')
  async getAll(): Promise<User[]> {
    return await this.appService.getUsers();
  }
}
