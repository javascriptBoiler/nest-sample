import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { passportJwtSecret } from 'jwks-rsa';
import authConfig from './auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authConfig.authority}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: authConfig.clientId,
      issuer: authConfig.authority,
      algorithms: ['RS256'],
    });
  }

  public async validate(payload: any) {
    if (!payload.sub) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'User Unautherized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = (await this.userService.findUser({ ...payload })) || {};
    return { ...user, ...payload };
  }
}
