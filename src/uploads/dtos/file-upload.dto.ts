import { ApiProperty } from "@nestjs/swagger";
import type{ Express } from "express";

export class FileUploadDto {
  @ApiProperty({
    type: 'array',
    name: 'file',
    items: {type: 'string', format: 'binary'},
  })
  file: Express.Multer.File;
}