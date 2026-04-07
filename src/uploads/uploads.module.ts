import { BadRequestException, Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { UploadController } from "./upload.controller";
import { diskStorage } from "multer";


@Module({
    controllers : [UploadController],
    imports : [MulterModule.register({
        storage : diskStorage({
            destination : './images' ,
            filename:(req , file , cb) =>{
            const prefix = `${Date.now()}-${Math.round(Math.random()*1000000)}`
            const filename = `${prefix}-${file.originalname}`;
            cb(null , filename)
            }
        }),
        fileFilter : (reg , file , cb)=>{
            if(file.mimetype.startsWith('image')){
                cb(null , true)
            }else{
                cb(new BadRequestException('Unsupport file format'), false)
            }
        },
        limits : {fieldSize : 1024*1024 *2}
    })]
})

export class UploadsModule {}

