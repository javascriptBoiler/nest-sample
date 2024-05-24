import { ApiProperty } from '@nestjs/swagger';
import { UserStates } from '@prisma/client';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'First Name',
  })
  readonly firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last Name',
  })
  readonly lastName: string;

  @ApiProperty({
    type: String,
    description: 'User Location',
  })
  readonly userLocation: string;

  @ApiProperty({
    type: String,
    description: 'User Image',
  })
  readonly image: string;

  @ApiProperty({
    type: String,
    description: 'User Mobile Number',
  })
  readonly mobile: string;

  @ApiProperty({
    type: String,
    description: 'User status',
    enum: UserStates,
  })
  readonly status: UserStates;
}
