import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'), // Get the refresh token from the request body
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET || '9645743868_refresh', // Same key used for refresh tokens
    });
  }

  avalidate(payload: any) {
    // You can add additional validation if needed, e.g., check the refresh token against the database
    return { userId: payload._id, email: payload.email };
  }
}
