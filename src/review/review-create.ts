import {IsString , IsNumber , Length, IsNotEmpty, IsOptional, Min, Max } from "class-validator"

export class reviewcreate{
    
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number ;

    @IsString()
    @Length(1,100)
    @IsNotEmpty()
    comment : string ;


}