import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
  constructor(
    private authService: AuthService) {
    super({ header: 'Authorization', prefix: 'Api-Key ' },
      true, (apikey, done) => {
        const checkKey = this.authService.validateApiKey(apikey);
        if (!checkKey) {
          return done(checkKey);
        }
        return done(null, true);
      });
  }
}
