import { createParamDecorator , ExecutionContext} from "@nestjs/common";
import { Jwtpayloadtype } from "../dto/Jwtpayloadtype";

export const currrentuser = createParamDecorator(
    (data , context :ExecutionContext) =>{
        const request = context.switchToHttp().getRequest()
        const payload : Jwtpayloadtype = request["user"]
        return payload ;
    }
)
