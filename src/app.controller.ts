import { User } from './app.entitie';
import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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
    console.log(createUserDto);

    const SPEC = ['ist', 'tele'];

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          indexNumber: createUserDto.indexNumber,
          firstName: createUserDto.firstname,
          lastName: createUserDto.lastname,
          email: createUserDto.email,
          specialization: SPEC[createUserDto.specialization],
        },
      ])
      .execute();

    return createUserDto;
  }

  @Get('/all')
  getAll(): object {
    return this.usersRepository.find();
  }
}
