import { User } from './app.entitie';
import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

const SPEC: string[] = [
  'Agronomia',
  'Analityka chemiczna i spożywcza',
  'Architektura',
  'Architektura i urbanistyka',
  'Architektura krajobrazu',
  'Architektura wnętrz',
  'Bioinżynieria w produkji zwierzęcej',
  'Biotechnologia',
  'Budowa i eksploatacja maszyn',
  'Budownictwo',
  'Computer aided engineering',
  'Elektronika i telekomunikacja',
  'Elektrotechnika',
  'Energetyka',
  'Finanse i rachunkowość',
  'Fizyka techniczna',
  'Geodezja i kartografia',
  'Gospodarowanie zasobami naturalnymi',
  'Informatyka Stosowana',
  'Inspekcja weterynaryjna',
  'Inżynieria biomedyczna',
  'Inżynieria gazu łupkowego',
  'Inżynieria materiałowa',
  'Inżynieria odnawialnych źródeł energii',
  'Inżynieria środowiskowa',
  'Inżynieria w biologii stosowanej',
  'Mechaniczna inżynieria tworzyw',
  'Mechanika i budowa maszyn',
  'Mechatronika',
  'Nanobioinżynieria',
  'Ochrona i kształtowanie środowiska',
  'Ochrona środowiska',
  'Ogrody zoologiczne i zwierzęta amatorskie',
  'Przetwórstwo tworzyw sztucznych',
  'Rolnictwo',
  'Rolnictwo ANG',
  'Rolnictwo w języku angielskim',
  'Szkoła doktorska',
  'Technika rolnicza i leśna',
  'Technologia chemiczna',
  'Technologia żywności i żywienie człowieka',
  'Teleinformatyka',
  'Transport',
  'Weterynaria',
  'Wzornictwo',
  'Zarządzanie',
  'Zarządzanie i inżynieria produkcji',
  'Zielarstwo i fitoteriapia',
  'Zoofizjoterapia',
  'Zootechnika',
];

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
