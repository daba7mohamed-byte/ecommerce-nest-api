

import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity.user";
import { AppService } from "./user.service";
import { AppController } from "./user.controller";
import { ProductModule } from "src/prodcuts/product.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { MailModule } from "../mail/mail.module";


@Module({
  imports: [MailModule ,
    TypeOrmModule.forFeature([User]),JwtModule.registerAsync({
            inject : [ConfigService],
            useFactory : (config : ConfigService) => {
              return{
                global : true ,
                secret : config.get<string>("JWT_SECRET")!,
                signOptions : {expiresIn : config.get<string>("JWT_EXPIRES_IN") as any}
              }
            }
          })
  ],
  providers: [AppService],
  controllers: [AppController],
  exports: [AppService],
})
export class UserModule {}