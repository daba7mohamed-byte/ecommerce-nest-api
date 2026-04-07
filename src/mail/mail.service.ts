import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, RequestTimeoutException } from "@nestjs/common";
import { User } from "src/users/entity.user";


@Injectable()
export class MailService {
    constructor(private readonly mailarService : MailerService){}
    public async sendloginEmial(email :string){

        
           try{
            const today = new Date()
            await this.mailarService.sendMail({
                to : email ,
                from : `<no-reply@myapp-nestjs-app.com>`,
                subject : `log in`,
                template : "login",
                context : {email , today}  
            })
           }catch(error){
            console.log(error);
            throw new RequestTimeoutException()
           }
           
    }

        public async sendVerfiyEmialTemplate(email :string , link :string){

        
           try{
          
            await this.mailarService.sendMail({
                to : email ,
                from : `<no-reply@myapp-nestjs-app.com>`,
                subject : `verify your account"`,
                template : "verify-account",
                context : {link}  
            })
           }catch(error){
            console.log(error);
            throw new RequestTimeoutException()
           }
           
    }
}