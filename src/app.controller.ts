import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  @Get()
  @Render('pages/home')
  index(): object {
    return {
      msg: 'Cezary Grzanka',
    };
  }

  @Get('/register')
  register(): string {
    return 'Rejestracja';
  }

  @Post('/register')
  async show(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
