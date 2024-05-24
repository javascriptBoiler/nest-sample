import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserStates, SignupStatus, UserRoles } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'User First Name',
  })
  @IsNotEmpty()
  readonly mobile: string;

  @ApiProperty({
    type: String,
    description: 'User Last Name',
  })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    type: String,
    description: 'User Email Address',
  })
  readonly email: string;
}

export class UserTokenDto {
  @IsNotEmpty()
  readonly sub: string;

  @IsNotEmpty()
  readonly email: string;

  readonly name?: string;
  readonly id?: number;
  readonly cognitoSub?: string;
  readonly image?: string | null;
  readonly mobile?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly userLocation?: string | null;
  readonly status?: UserStates;
  readonly isDeleted?: boolean;
  readonly isDeactivated?: boolean;
  readonly signupStatus?: SignupStatus;
  readonly userPoint?: number | null;
  readonly firebaseMzgTokens?: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly country?: string;
  readonly userRole?: UserRoles;
}
