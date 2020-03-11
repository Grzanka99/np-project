import { Controller, Get, Render, Post } from '@nestjs/common';

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
  create(): object {
    return {
      msg: 'Registering endpoint',
    };
  }
}
