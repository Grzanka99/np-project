import { CreateUserDto } from './dto/create-user.dto';
import { User } from './app.entitie';
import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async createUser(user: CreateUserDto): Promise<object> {
    const users: User[] = await this.getUsers();

    const conflicts: User = users.find(el => {
      return el.email === user.email;
    });

    if (conflicts) {
      return {
        status: {
          name: 'error',
          message: 'User already exists',
        },
        user,
      };
    } else {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            indexNumber: user.indexNumber,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            specialization: SPEC[user.specialization],
          },
        ])
        .execute();

      return {
        status: {
          name: 'ok',
          message: 'created',
        },
        user,
      };
    }
  }
}
