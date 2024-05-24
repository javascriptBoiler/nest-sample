import { Injectable, NestMiddleware, HttpStatus, Inject } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import * as jsonwebtoken from 'jsonwebtoken';
import { UserService } from 'src/module/user/user.service';
import * as jwksRsa from 'jwks-rsa';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  userPoolId: string;
  clientId: string;
  region: string;
  authority: string;
  cognitoUserPool: CognitoUserPool;
  jwksClient: jwksRsa.JwksClient;
  constructor(private userService: UserService) {
    this.userPoolId = process.env.COGNITO_USER_POOL_ID;
    this.clientId = process.env.COGNITO_CLIENT_ID;
    this.region = process.env.COGNITO_REGION;
    this.authority = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;
    this.cognitoUserPool = new CognitoUserPool({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID,
    });
    this.jwksClient = jwksRsa({
      jwksUri: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
    });
  }

  private extractJwtToken(JWTtoken: string): {
    header: any;
    payload: any;
    token: string;
  } {
    const token = JWTtoken.replace('Bearer ', '');
    const [headerBase64, payloadBase64] = token.split('.');

    return {
      header: JSON.parse(Buffer.from(headerBase64, 'base64').toString('utf-8')),
      payload: JSON.parse(
        Buffer.from(payloadBase64, 'base64').toString('utf-8'),
      ),
      token,
    };
  }

  private async getPublicKey(kid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.jwksClient.getSigningKey(kid, (err, key) => {
        if (err) {
          reject(
            new Error(
              `Failed to retrieve public key for ${kid}: ${err.message}`,
            ),
          );
        } else {
          const publicKey = key.getPublicKey();
          resolve(publicKey);
        }
      });
    });
  }

  private async verifyToken(
    token: string,
    publicKey: jsonwebtoken.Secret,
  ): Promise<any> {
    return jsonwebtoken.verify(token, publicKey);
  }

  async use(req: any, res: any, next: (error?: any) => void) {
    try {
      const jwtToken = this.extractJwtToken(req.headers.authorization);
      const publicKey = await this.getPublicKey(jwtToken.header.kid);
      const userData = await this.verifyToken(jwtToken.token, publicKey);

      if (!userData) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Invalid token',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const { sub, email, name } = userData;
      // find is user saved in the database
      let user = await this.userService.findUser({ sub, email });
      if (!user?.id) {
        // create a DB record for the user.
        user = await this.userService.createUser({ sub, email, name });
      }
      //add user data from middlewear
      req.user = { ...user, ...jwtToken.payload };
      next();
    } catch (error) {
      throw new HttpException(
        'Not authorized. ' + error.message,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
