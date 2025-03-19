import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsArray, IsOptional } from 'class-validator';

export class SignupDto {
  @ApiProperty({ description: 'Username of the user' })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

}
