import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import type { Express  , Response} from "express";
import { diskStorage } from "multer";
import { ApiProperty ,ApiConsumes , ApiBody } from "@nestjs/swagger";
import { FileUploadDto } from "./dtos/file-upload.dto";

@Controller("/api/uploads")
export class UploadController{

    @Post()
    @UseInterceptors(FileInterceptor('file' , ))
    public uploadFile(@UploadedFile() file :Express.Multer.File ){
      if(!file) throw new BadRequestException("no file provided");

      console.log("file upload" , {file}) ;
      return { massage : "File uploaded successfully"}
    }

    
    @Post("/multiple-files")
    @UseInterceptors(FilesInterceptor("files"))
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: FileUploadDto, description: 'Upload multiple files' })
    public uploadMultipleFiles(@UploadedFiles() files :Array <Express.Multer.File> ){
      if(!files || files.length === 0) throw new BadRequestException("no file provided");

      console.log("file upload" , {files}) ;
      return { massage : "Files uploaded successfully"}
    }


    @Get("/:image")
    public showUploadedImage(@Param("image") Image : string , @Res() res : Response){
        return res.sendFile(Image , {root : 'images'})
    }
}