import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      //console.log("Before Route Handler")

      // return next.handle().pipe(tap(()=>console.log(" after route handler")))
       
      // ده كود بفعلة يدوي للمعرف فقط ملحوظة لزم يكون object
      //serialization تعديل الرد قبل الارسال

      return next.handle().pipe(map((DataFromRouteHandler)=>{
        const { password , ...otherData} = DataFromRouteHandler
        return {...otherData}
      }))
    }    
}