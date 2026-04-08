import { ClassSerializerInterceptor, MiddlewareConsumer, Module , NestModule , RequestMethod} from '@nestjs/common';
import { ProductModule } from './prodcuts/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from './prodcuts/product.entity';
import { User} from './users/entity.user';
import { Review } from './review/review.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { modulereview } from './review/review.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './users/User.module';
import { UploadsModule } from './uploads/uploads.module';  
import { MailModule } from './mail/mail.module';
import { LoggerMiddlewere } from './users/middleweres/logger.middlewere';
import { ThrottlerModule , ThrottlerGuard } from '@nestjs/throttler';
import { DataSourcepptions } from '../db/data-source';
import { AppController } from './app.controller';


@Module({
  controllers:[AppController],
  imports: [modulereview, ProductModule,UserModule,UploadsModule,MailModule,TypeOrmModule.forRoot(DataSourcepptions),
    // inject : [ConfigService],
    // useFactory :(config : ConfigService)=>{
    //   return {
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: config.get<number>("DB_PORT"),
    //   username: config.get<string>("DB_USERNAME"),
    //   password: config.get<string>("DB_PASSWORD"),
    //   database: config.get<string>("DB_DATABASE"),
    //   entities: [product , User , Review],
    //   synchronize: process.env.NODE_ENV !== 'production',
    //   }

    // }

  //TypeOrmModule.forRoot({
  //     type: 'mysql',
  //     host: 'localhost',
  //     port: 3306,
  //     username: 'root',
  //     password: 'my-secret-pw',
  //     database: 'nest-test',
  //     entities: [product],
  //     synchronize: true,
  
    // }),
  ConfigModule.forRoot({
     isGlobal : true,
     envFilePath: process.env.NODE_ENV !== 'production'? `.env.${process.env.NODE_ENV}` : ".env"
  }),JwtModule.registerAsync({
        inject : [ConfigService],
        useFactory : (config : ConfigService) => {
          return{
            global : true ,
            secret : config.get<string>("JWT_SECRET")!,
            signOptions : {expiresIn : config.get<string>("JWT_EXPIRES_IN") as any}
          }
        }
      }), 
      ThrottlerModule.forRoot({
        throttlers: [
    {
      ttl: 60,
      limit: 10,
     }
  ]
})
      ], 
  providers: [
    {
      provide : APP_INTERCEPTOR ,
      useClass : ClassSerializerInterceptor
    },

    {
    provide : APP_GUARD ,
    useClass : ThrottlerGuard
    }
  ],
  exports : []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddlewere)
    .exclude({  // exclude the logger middleware from the GET /api/products route
      path : "api/products" ,
       method : RequestMethod.GET
      })
    .forRoutes({
       path : "*",
       method : RequestMethod.ALL 
      });
      consumer
      .apply(LoggerMiddlewere)
     .forRoutes({
       path : "api/products",
       method : RequestMethod.GET
      },
      // {
      //  path : "api/products",
      //  method : RequestMethod.POST
      // }
    )

      
  }
}


