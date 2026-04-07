
 import{IsString , IsNotEmpty , Length, IsEmail, IsOptional} from 'class-validator'
import { UserType } from '../enum/usertype.user';


export class registerdto{ 
    @IsOptional()
    @Length(2,50)
    @IsNotEmpty()
    @IsString()
    username? : string ;

    @IsEmail()
    @Length(10,50)
    @IsNotEmpty()
    @IsString()
    email: string

    @Length(5,150)
    @IsNotEmpty()
    @IsString()
    password : string

    @IsOptional()
    @Length(2,50)
    @IsNotEmpty()
    @IsString()
    TypeUser? : UserType


}