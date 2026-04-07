import { BadRequestException, ForbiddenException, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { registerdto } from './dto/Register.user.dto';
import { loginDto } from './dto/login.user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity.user';
import { Repository , Like } from 'typeorm';
import * as  bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { Jwtpayloadtype } from './dto/Jwtpayloadtype';
import { ConfigService } from '@nestjs/config';
import{updateUserDto} from "./dto/update-user"
import { UserType } from './enum/usertype.user';
import { join } from 'path';
import {  link, unlinkSync } from 'fs';
import { log } from 'console';
import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from '../mail/mail.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AppService {
constructor(@InjectRepository(User)
private readonly UserRepository:Repository<User>,
private readonly jwtservice : JwtService ,
private readonly config : ConfigService ,
private readonly mailService : MailService
){}
  
public async rigster(registerdto : registerdto ){
    const { email , password , username , TypeUser } = registerdto
   const userfromDb= await this.UserRepository.findOne({where : {email}})
   if(userfromDb)throw new BadRequestException ("user already exist");
   
   const salt = await bcrypt.genSalt(10)
   const hashedpassword = await bcrypt.hash(password , salt) 

   let newUser = this.UserRepository.create({
    email ,
    username,
    TypeUser ,
    password :hashedpassword ,
    verificationToken : randomBytes(23).toString('hex')
    
   })
   newUser = await this.UserRepository.save(newUser)
   const link = `${this.config.get<string>('DOMAIN')}/auth/verify-email/${newUser.id}/${newUser.verificationToken }`
   await this.mailService.sendVerfiyEmialTemplate(newUser.email,link)

//    const payload : Jwtpayloadtype = {id :newUser.id  , email : newUser.email , TypeUser : newUser.TypeUser}
//    const accesstoken = await this.jwtservice.signAsync(payload)
   return { message : 'verification token has been sent to your email , please verify you email address' }

}

public async login(loginDto : loginDto ){
    const { email , password  } = loginDto
   const userfromDb= await this.UserRepository.findOne({where : {email}})
   if(!userfromDb)throw new BadRequestException ("user already exist");
   
   const compare_password = await bcrypt.compare(password , userfromDb.password) ;

  if(!compare_password)throw new BadRequestException ("user already exist");
    
  if(!userfromDb.isAccountVerified){
    let verificationToken = userfromDb.verificationToken

    if(!verificationToken){
        userfromDb.verificationToken = randomBytes(32).toString('hex')
        const result = await this.UserRepository.save(userfromDb)  
        verificationToken = result.verificationToken 
    }
       
      const link = `${this.config.get<string>('DOMAIN')}/auth/verify-email/${userfromDb.id}/${verificationToken }`
        await this.mailService.sendVerfiyEmialTemplate(userfromDb.email,link)

      return { message : 'verification token has been sent to your email , please verify you email address' }

  }

  const payload : Jwtpayloadtype = {id :userfromDb.id  , email : userfromDb.email , TypeUser : userfromDb.TypeUser }
   const accesstoken = await this.jwtservice.signAsync(payload)
   await this.mailService.sendloginEmial(userfromDb.email)
   
  
   return {accesstoken }

}

async getcurrentuser(id : number){
    const getId = await this.UserRepository.findOne({where : {id }})
    if(!getId)throw new BadRequestException ("user not found ");
    return getId
}

public getAll(){
  return this.UserRepository.find()
}

public async update(id : number , updateUserDto : updateUserDto ){
const {password , username} = updateUserDto 
const user = await this.UserRepository.findOne({where : {id}})
if(!user)throw new BadRequestException ("user already exist");

user.username = username ?? user.username ;
if(password){
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password,salt)
}

return this.UserRepository.save(user)
}

// private async hashPassword(password: string): Promise<string> {
//   const salt = await bcrypt.genSalt(10);
//   return bcrypt.hash(password, salt);

// }

public async delete(id : number  , payload : Jwtpayloadtype){
    const user = await this.UserRepository.findOne({where : {id }})
    if(!user)throw new BadRequestException ("user not found ");

    if(user.id === payload.id || payload.TypeUser===UserType.ADMIN){
        await this.UserRepository.remove(user)
    return {message  : "user has been deleted "}
}
    throw new ForbiddenException("you are not allowed")
}

// public async setProfileImage(userId : number , newProfileImage : string){
//     const user = await this.getcurrentuser(userId);
//     user.profileIamge = newProfileImage;
//     return this.UserRepository.save(user)
// }

public async setProfileImage(userId : number , newProfileImage : string){
    const user = await this.getcurrentuser(userId);

    if(user.profileIamge=== null){
        user.profileIamge = newProfileImage
    }else{
    await this.removeProfileimage(userId)
    user.profileIamge = newProfileImage
    }
     return this.UserRepository.save(user)
}

public async removeProfileimage(userId : number){
  const user = await this.getcurrentuser(userId);
  if(user.profileIamge === null)
    throw new BadRequestException("there is no profile image") ;

  const imagePath = join(process.cwd() , `./images/users/${user.profileIamge}`)
  unlinkSync(imagePath) ; // مسح الصورة
  
  console.log(imagePath)
  user.profileIamge = null ;

  return this.UserRepository.save(user)

}
public async verifyEmail(useId : number , verifiactionToken : string){
     const user = await this.getcurrentuser(useId)
      if(user.isAccountVerified === null)
         throw new NotFoundException("there is no verifiaction token") 
        if(user.verificationToken !== verifiactionToken) 
         throw new BadRequestException('invalid link') 
        user.isAccountVerified = true ; user.verificationToken = null
         await this.UserRepository.save(user) 
         return {message : "your email has been varified , please log in to your account"}

}
}