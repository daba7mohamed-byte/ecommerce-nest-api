import { JwtModule } from '@nestjs/jwt';
import { Module  , forwardRef } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { product } from "./product.entity";
import { UserModule } from "../users/User.module";

@Module({
    imports :[ TypeOrmModule.forFeature(([product])),UserModule , JwtModule],
    controllers : [ProductController],
    providers : [ProductService  ],
    exports:[ProductService]

})

export class ProductModule{}