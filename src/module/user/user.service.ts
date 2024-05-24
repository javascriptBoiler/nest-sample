import { Injectable } from '@nestjs/common';
import { UpdateUserDto, UserTokenDto } from './dto';
import { UserData } from './user.interface';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';

const select = {
  email: true,
  id: true,
  image: true,
  mobile: true,
  firstName: true,
  lastName: true,
  userLocation: true,
  status: true,
  isDeleted: true,
  isDeactivated: true,
  signupStatus: true,
  userPoint: true,
  createdAt: true,
  updatedAt: true,
};

const include = {
  hostedProducts: true,
  consumeProducts: true,
  productRequest: true,
  givenFeedBack: true,
  reciveFeedBack: true,
  productWishList: true,
};
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: UserTokenDto): Promise<UserData[] | any> {
    const { email, sub, name }: any = userData;

    const data = {
      email,
      cognitoSub: sub,
    };

    if (name) {
      const firstName = name.substring(0, name.indexOf(' '));
      const lastName = name.substring(name.indexOf(' ') + 1);

      data['firstName'] = firstName;
      if (lastName) {
        data['lastName'] = lastName;
      }
    }

    const userNotUnique = await this.prisma.user.findFirst({
      where: data,
    });

    if (userNotUnique) {
      const errors = 'User already exist';
      throw new HttpException(
        { message: 'Email should be unique', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.prisma.user.create({ data });
    if (!user) {
      throw new HttpException(
        { message: 'error on user creation' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return { ...user };
  }

  async findUser(
    userProps: { sub: string; email: string } | UserTokenDto,
  ): Promise<any> {
    return this.prisma.user.findFirst({
      where: { email: `${userProps.email}`, cognitoSub: `${userProps.sub}` },
      include,
    });
  }

  async updateUser(cognitoSub: string, data: UpdateUserDto): Promise<any> {
    const where = { cognitoSub };
    return this.prisma.user.update({ where, data, select });
  }
}
