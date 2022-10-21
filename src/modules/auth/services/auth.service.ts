import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '../dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { ValidationMessage } from '../../../core/validation/validation-messages';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  private apiKeys: string[] = [
    '1hfAJaPsI6WwKmE8OfDG8akJ54JmfnD9',
    '1234',
  ];

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {
  }

  async login(dto: LoginDTO): Promise<any> {
    const user = await this.validate(dto.username, dto.password);

    const payload = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  validateApiKey(apiKey: string): boolean {
    return this.apiKeys.find(k => apiKey === k) !== undefined;
  }

  private async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ where: { pseudo: username }, relations: ['role'] });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new ForbiddenException(ValidationMessage.INVALID_EMAIL_PASSWORD);
    }

    return user;
  }

  async resetPassword(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Demande de changement de votre mot de passe',
      template: 'templates/forgot-password',
      context: {
        url: `localhost:4200/reset-password?token=${this.jwtService.sign(payload)}`,
      },
    });
  }
}
