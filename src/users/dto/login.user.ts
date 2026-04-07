import {IsString , Length, IsNotEmpty, IsEmail } from "class-validator"

  
  export class loginDto{
   
   @IsEmail()
    @Length(10,50)
    @IsNotEmpty()
    @IsString()
    email: string

    @Length(5,150)
    @IsNotEmpty()
    @IsString()
    password : string

    }