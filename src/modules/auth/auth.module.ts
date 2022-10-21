import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './services/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { ApiKeyAuthGuard } from './guards/api-key-auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'secret',
      /*signOptions: { expiresIn: process.env.JWT_TTL },*/
      signOptions: { expiresIn: 25000000 },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    ApiKeyStrategy,
    ApiKeyAuthGuard,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {
}
