import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../core/decorators/role.decorator';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateUserDTO } from '../dto/user/update-user.dto';
import { UserDTO } from '../dto/user/user.dto';
import { User } from '../entities/user.entity';
import { RoleEnum } from '../enums/role.enum';
import { UserService } from '../services/user.service';
import { RoleDTO } from '../dto/role/role.dto';
import { MailerService } from '@nestjs-modules/mailer';

const nodemailer = require('nodemailer');

@ApiTags('users')
@Controller({
  path: 'users',
})
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private mailerService: MailerService,
  ) {
  }

  @Get()
  @Roles(RoleEnum.ADMINISTRATOR)
  @ApiResponse({ status: 200, type: UserDTO, isArray: true })
  async getAll(): Promise<UserDTO[]> {
    const users = await this.userService.getAll();
    return User.toDTOList(users, UserDTO);
  }

  @Get(':id')
  @Roles(RoleEnum.ADMINISTRATOR)
  @ApiResponse({ status: 200, type: UserDTO, isArray: true })
  async get(@Param('id') id: number): Promise<UserDTO> {
    const user = await this.userService.getUserWithRole(id);
    return user.toDTO(UserDTO);
  }


  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  @Roles(RoleEnum.ADMINISTRATOR)
  async createOne(@Body() dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    dto.role = new RoleDTO();
    dto.password = '';
    let user = this.userService.create(dto);
    const password = Math.random().toString(36).slice(-8);
    user.password = password;
    user = await this.userService.generatePasswordAndSalt(user);
    await this.sendEmailUserCreation(user, password);
    user = await this.userService.insert(user);
    return user.toDTO(UpdateUserDTO);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  @Roles(RoleEnum.ADMINISTRATOR)
  async patchOne(@Param('id') id: number, @Body() dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    dto.role = new RoleDTO();
    const currentUser = await this.userService.findOneById(id);

    const user = Object.assign(currentUser, dto);
    await this.userService.save(user);

    return user.toDTO(UpdateUserDTO);
  }

  private async sendEmailUserCreation(user: User, password: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Nouveau compte sur UCOR',
      template: 'templates/user-create',
      context: {
        email: user.email,
        password,
      },
    });
  }
}
