import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { reviewservice } from "./review.servise";
import {reviewcreate} from "./review-create"
import { reviewupdate } from "./review.update";
import { currrentuser } from "../users/decorators/current-user.decorator";
import type { Jwtpayloadtype } from "../users/dto/Jwtpayloadtype";
import { authRolesguard } from "src/users/guard/auth-roles-gaued";
import { Roles } from "../users/decorators/user-roles.decorator";
import { UserType } from "../users/enum/usertype.user";
import { authguard } from "../users/guard/auth.guard";

@Controller("/api/review")
export class reviewcontroller{
constructor(private readonly reviewService: reviewservice ) {}

@Get()
// @UseGuards(authRolesguard)
// @Roles(UserType.ADMIN)

getAllreviews(
    @Query("pageNumber" , ParseIntPipe) pageNumber : number ,
    @Query("reviewperpage" , ParseIntPipe) reviewperpage : number
){
    return this.reviewService.getall(pageNumber , reviewperpage)
}


@Post("/:id")
@UseGuards(authguard)
@Roles(UserType.ADMIN , UserType.NORMAL_USER)  

createreview(
    @Param("id",ParseIntPipe) productId :number ,
    @Body() bady :reviewcreate ,
    @currrentuser() payload : Jwtpayloadtype
){
    return this.reviewService.createreview( payload.id ,productId ,bady)
}

@Put(":id")
 @UseGuards(authguard)
  @Roles(UserType.ADMIN)
updatereviewcreatereview(
    @Param("id",ParseIntPipe) reviewId :number ,
    @Body() bady :reviewupdate,
    @currrentuser() payload : Jwtpayloadtype
){
    return this.reviewService.updatereview(reviewId,bady ,payload.id  )
}

@Delete("/delete/:id")
 @UseGuards(authguard)
@Roles(UserType.ADMIN)
delatereview(@Param("id" , ParseIntPipe)Param : number , @currrentuser()payload : Jwtpayloadtype ){
  return this.reviewService.delete(Param , payload  )
}

}