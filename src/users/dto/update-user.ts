 import{IsString , IsNotEmpty , Length,  IsOptional} from 'class-validator'

export class updateUserDto{ 
    @IsOptional()
    @Length(2,50)
    @IsNotEmpty()
    @IsString()
    username? : string ;
    
    @IsOptional()
    @Length(5,150)
    @IsNotEmpty()
    @IsString()
    password ?: string



}