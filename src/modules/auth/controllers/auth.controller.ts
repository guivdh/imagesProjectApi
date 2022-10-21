import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, ForbiddenException, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/login.dto';
import { ResetUserPasswordDTO } from '../../user/dto/user/reset-user-password.dto';
import { UserService } from '../../user/services/user.service';
import { SetUserPasswordDTO } from '../../user/dto/user/set-user-password.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { MailerService } from '@nestjs-modules/mailer';

@ApiTags('authentication')
@Controller({ path: '' })
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {
  }

  @Post('/login')
  async loginAction(@Body() dto: LoginDTO): Promise<any> {
    return this.authService.login(dto);
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  async setPassword(@Body() dto: ResetUserPasswordDTO) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (user) {
      this.authService.resetPassword(user);
    }
    return true;
  }

  @Post('/set-password')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  async resetPassword(@Body() dto: SetUserPasswordDTO) {
    try {
      const result = await this.jwtService.verify(dto.token);
      const oldUser = await this.userService.findOneById(result.id);
      const user = {
        password: await bcrypt.hash(dto.password, 10),
      };
      const newUser = Object.assign(oldUser, user);
      await this.userService.save(newUser);
      await this.mailerService.sendMail({
        to: oldUser.email,
        subject: 'Changement de votre mot de passe',
        template: 'templates/reset-password',
      });
      return true;
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}
