import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class ProductCreateDto{

        @IsString()
        @IsNotEmpty()
        @Length(2 , 150)
        @ApiProperty({ description: 'The title of the product', example: 'Example Product' })

        title : string ;
        
        @IsString()
        @IsNotEmpty()
        @Length(2 , 150)
        @ApiProperty({ description: 'The description of the product', example: 'This is an example product.' })
        description: string ;
        
        @IsNumber()
        @IsNotEmpty()
        @ApiProperty({ description: 'The price of the product', example: 19.99 })
        price : number ;
}