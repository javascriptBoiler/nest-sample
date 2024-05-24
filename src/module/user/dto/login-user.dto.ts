import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    type: String,
    description: 'Mobile Number',
  })
  @IsNotEmpty()
  readonly mobile: string;

  @ApiProperty({
    type: String,
    description: 'Password',
  })
  @IsNotEmpty()
  readonly password: string;
}
