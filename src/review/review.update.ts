import {IsString , IsNumber , Length, IsNotEmpty, IsOptional, Min, Max } from "class-validator"

export class reviewupdate{
    
    @IsNumber()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    @IsOptional()
    rating?: number ;

    @IsString()
    @Length(1,150)
    @IsNotEmpty()
    @IsOptional()
    comment?: string ;


}