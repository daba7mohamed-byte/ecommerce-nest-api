import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class ProductUpdateDto{

        @IsString()
        @IsNotEmpty()
        @Length(2 , 150)
        @IsOptional()
        @ApiPropertyOptional({ description: 'The title of the product', example: 'Example Product' })
        title ?: string ;
        
        @IsString()
        @IsNotEmpty()
        @Length(2 , 150)
        @IsOptional()
        @ApiPropertyOptional({ description: 'The description of the product', example: 'This is an example product.' })
        description? : string ;
        
        @IsNumber()
        @IsNotEmpty()
        @IsOptional()
        @ApiPropertyOptional({ description: 'The price of the product', example: 19.99 })
        price? : number ;
}