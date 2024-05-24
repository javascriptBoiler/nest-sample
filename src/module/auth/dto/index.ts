import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    type: String,
    description: 'User Name',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'User Password',
  })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    type: String,
    description: 'User Email',
  })
  @IsNotEmpty()
  readonly email: string;
}

export class LoginUserDto {
  @ApiProperty({
    type: String,
    description: 'Email ID',
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    type: String,
    description: 'User Password',
  })
  @IsNotEmpty()
  readonly password: string;
}
