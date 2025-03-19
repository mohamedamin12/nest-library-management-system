import { IsString, IsEmail, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  readonly _id: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsArray()
  @ArrayNotEmpty()
  readonly roles: string[];

  @IsOptional() 
  readonly __v?: number;
}