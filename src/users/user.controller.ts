import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put , Headers,UseGuards, Req, UseInterceptors, ClassSerializerInterceptor, BadRequestException} from '@nestjs/common';
import { AppService } from './user.service';
import { registerdto } from './dto/Register.user.dto';
import { loginDto } from './dto/login.user';
import { authguard } from './guard/auth.guard';
import { currrentuser } from './decorators/current-user.decorator';
import type { Jwtpayloadtype } from "./dto/Jwtpayloadtype";
import { Roles } from './decorators/user-roles.decorator';
import { UserType } from './enum/usertype.user';
import { authRolesguard } from './guard/auth-roles-gaued';
import { updateUserDto } from './dto/update-user';
import { Res } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Express  , Response} from "express";
import { diskStorage } from "multer";
import { UploadedFile } from '@nestjs/common';
import {  ApiSecurity ,ApiConsumes , ApiBody } from "@nestjs/swagger";
import { ImageUpdateDto } from './dto/image.updata.dto';
//import { LoggerInterceptor } from './interceptors/logger.interceptor';


@Controller("/auth")
export class AppController {
  constructor(private readonly appService: AppService) {}    
  

  @Post("/creatusername")
  creatusername(@Body() Body : registerdto ){
    return this.appService.rigster(Body)
   }

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  login(@Body() Body : loginDto ){
   return this.appService.login(Body)
  }

  @Get("/current-user")
  @UseGuards(authguard)
//  @UseInterceptors(ClassSerializerInterceptor)
  public getcurrentuser(@currrentuser() payload  : Jwtpayloadtype ){
    console.log("get current User Route Handler called ")
   return this.appService.getcurrentuser(payload.id)
 
  }

  @Get()
  @Roles(UserType.ADMIN )
  @UseGuards(authRolesguard)
 // @UseInterceptors(ClassSerializerInterceptor) انا مشغلة globle
  getAll(){
    return this.appService.getAll()
  }
  
  @Put("/update")
  @UseGuards(authguard)
  public updateUser(@currrentuser() payload : Jwtpayloadtype , @Body() body  : updateUserDto){
   return this.appService.update(payload.id , body)
  }


@Delete('/delete/:id')
@UseGuards(authguard)
public deleteUser(@Param("id" , ParseIntPipe) id: number , @currrentuser() payload : Jwtpayloadtype){
return this.appService.delete(id , payload)
}

@Post('upload-image')
@UseGuards(authguard)
@UseInterceptors(FileInterceptor('user-image',{
  storage: diskStorage({
       destination : './images/users',
       filename : (req , file , cb)=>{
        const profix = `${Date.now()}-${Math.round(Math.random()*1000000)}`
        const filename = `${profix}-${file.originalname}`
        cb(null , filename)
       }
  }),
  fileFilter : (req , file , cb)=>{
    if (file.mimetype.startsWith("image")){
      cb(null , true)
    }else{
      cb(new BadRequestException('Unsupported file format'),false)
    }
  },
   limits : {fileSize : 1024*1024} 

}))
@ApiSecurity('bearer')
@ApiConsumes('multipart/form-data')
@ApiBody({type : ImageUpdateDto , description : "Replace the user's profile image"})
public uploadProfileImage(
  @UploadedFile() file : Express.Multer.File ,
  @currrentuser() payload : Jwtpayloadtype
){
    if(!file) throw new BadRequestException("no image provided");
    return this.appService.setProfileImage(payload.id , file.filename )
}


@Delete("image/remove-profile-image")
@UseGuards(authguard)
@ApiSecurity('bearer')
@ApiConsumes('multipart/form-data')
@ApiBody({type : ImageUpdateDto , description : "Remove the user's profile image"})
public removeProfileImage(@currrentuser() payload : Jwtpayloadtype){
  return this.appService.removeProfileimage(payload.id)
}

@Get("verify-email/:id/:verificationToken")
public verifyEmail(
  @Param("id", ParseIntPipe) id : number ,
  @Param('verificationToken') verificationToken : string
){
   return this.appService.verifyEmail(id ,verificationToken  )
}

}


  









