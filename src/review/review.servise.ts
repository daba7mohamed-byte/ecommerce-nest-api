import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./review.entity";
import { Repository } from "typeorm";
import { reviewupdate } from "./review.update";
import { reviewcreate } from "./review-create";
import { ProductService } from "../prodcuts/product.service";
import { AppService } from "../users/user.service";
import { Jwtpayloadtype } from "../users/dto/Jwtpayloadtype";
import { UserType } from "../users/enum/usertype.user";

@Injectable()
export class reviewservice{
constructor(@InjectRepository(Review)
private readonly reviewsReposiotry : Repository<Review> ,
private readonly productService : ProductService,
private readonly userService : AppService

){}

public async createreview( productId : number , userId:number , dto : reviewcreate ){
      const product  = await this.productService.getId(productId) ;
      const user = await this.userService.getcurrentuser(userId);
      const review = this.reviewsReposiotry.create({...dto , user , product })
      const result =  await this .reviewsReposiotry.save(review)

      return {
        id : result.id ,
        comment :  result.comment,
        rating : result.rating,
        createdAt : result.createdAt,
        userId : user.id,
        productId : product.id
      }
      
}

public async getall(pageNumber: number , reviewparpage: number) {
return await this.reviewsReposiotry.find( {
   skip: reviewparpage * (pageNumber - 1),
   take: reviewparpage,
  // skip:3,
  // take:3,
  order : { createdAt : "DESC"}})  //"DESC" تنازلي    , "ASC" تصاعدي
 
}


public async updatereview(reviewId : number , dto :  reviewupdate ,userId  :number){
   const review = await this.getReviewBy(reviewId);
   if(review.user.id !== userId){
    throw new NotFoundException(" you are not allowed");
   }
    review.rating = dto.rating ?? review.rating ;
    review.comment = dto.comment ?? review.comment ;
     console.log(userId)
     console.log(review.user.id)
    return this.reviewsReposiotry.save(review)
}

 public async delete(id : number , payload : Jwtpayloadtype){
  const review = await this.getReviewBy(id)
  if(review.user.id === payload.id || payload.TypeUser === UserType.ADMIN ){
   await this.reviewsReposiotry.remove(review)
  return { massage : ' delete successfully'}

}
   throw new NotFoundException(" you are not allowed");
 
  }
private async getReviewBy(id : number){
  const  review = await this.reviewsReposiotry.findOne({where :{ id}})
if(!review) throw new NotFoundException("review not found");
return review
}
}