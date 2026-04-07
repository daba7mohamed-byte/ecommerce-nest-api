import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./review.entity";
import { reviewservice } from "./review.servise";
import { reviewcontroller } from "./review.controllrt";
import { JwtModule } from "@nestjs/jwt";
import { ProductModule } from "src/prodcuts/product.module";
import { UserModule } from "src/users/User.module";

@Module({ 
    imports : [TypeOrmModule.forFeature([Review]),UserModule , ProductModule ,JwtModule],
    providers : [reviewservice] ,
    controllers : [reviewcontroller],
    exports : [],
})

export class modulereview {}
