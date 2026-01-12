import { IsArray, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @IsString()
  @MinLength(1)
  fullName: string;

  @IsString({ each: true }) // 1. Valida que CADA item del array sea un string
  @IsArray()                // 2. Valida que la propiedad en sí misma sea un array
  @IsOptional()             // 3. Opcional, porque en tu Entity ya tienes un default
  roles?: string[];

}