import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import {Request} from'express'
import { Jwtpayloadtype } from "../dto/Jwtpayloadtype";
import { Reflector } from "@nestjs/core";
import { AppService } from "../user.service";
import { UserType } from "../enum/usertype.user";
import { currrentuser } from "../decorators/current-user.decorator";

@Injectable()
export class authRolesguard implements CanActivate{
   constructor( private readonly configservice : ConfigService , 
                private readonly jwtservice :JwtService,
                private readonly reflector : Reflector ,
                private readonly userService : AppService
   ){}


   async canActivate(context: ExecutionContext){
    const roles : UserType[] = this.reflector.getAllAndOverride('roles',[context.getHandler(),context.getClass()])
    if(!roles||roles.length===0) return false ;

   const request : Request = context.switchToHttp().getRequest()

  const [ type , token]  = request.headers.authorization?.split(" ")??[]
  if(token && type === "Bearer"){
         try{
          const peyload : Jwtpayloadtype = await this.jwtservice.verifyAsync(token , {
            secret : this.configservice.get<string>("JWT_SECRET")
          }
        
        )
          const CURRENT_USER_KEY = 'currentUser';
          const user = await this.userService.getcurrentuser(peyload.id)
          if(!user) return false ;
         if (roles.includes(user.TypeUser)) {
          request[CURRENT_USER_KEY] = peyload;
          return true
}

        
         }catch(error)
         {
          return false
         }
  }else{
    return false
  }
  
  return false ;
    }

}