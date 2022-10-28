import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ParameterModule } from './modules/parameter/parameter.module';
import {JwtModule} from "@nestjs/jwt";
import { TicketModule } from "./modules/ticket/ticket.module";
import { AddressModule } from "./modules/address/address.module";
import { CommentModule } from "./modules/comment/comment.module";
import { CountryModule } from "./modules/country/country.module";
import { EstablishmentModule } from "./modules/establishment/establishment.module";
import { ImageModule } from "./modules/image/image.module";
import { LikeModule } from "./modules/like/like.module";
import { PublicationModule } from "./modules/publication/publication.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public')
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: '',
          pass: '',
        },
      },
      defaults: {
        from: '"ProjetsDemo" <mailer.projetsdemo@gmail.com>',
      },
      template: {
        dir: './templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'imagesproject',
      autoLoadEntities: true,
    }),
    UserModule,
    MailerModule,
    ParameterModule,
    TicketModule,
    AddressModule,
    CommentModule,
    CountryModule,
    EstablishmentModule,
    ImageModule,
    LikeModule,
    PublicationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
