import { ApiProperty } from "@nestjs/swagger";
import type { Express } from "express";

export class ImageUpdateDto {
    @ApiProperty({
         type: 'string',
         format: 'binary',  
         required : true ,
         name : 'user-image'
        })
    image: Express.Multer.File;
}