export class CreateUserDto {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly indexNumber: number;
  readonly specialization: number;
  readonly avg: number;
  readonly remote: boolean;
}
