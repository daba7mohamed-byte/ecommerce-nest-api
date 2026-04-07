import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { product } from "./product.entity";
import { Repository , Like , Between} from "typeorm";
import { ProductCreateDto } from "./product.create.dto";
import { ProductUpdateDto } from "./product.update.dto";
import { AppService } from "../users/user.service";


@Injectable()
export class ProductService {
  constructor(@InjectRepository(product)
  private readonly productsRepository : Repository<product>,
    private readonly useService: AppService,
){}
 
public async createProduct(dto : ProductCreateDto , userid  :number ){
  const user = await this.useService.getcurrentuser(userid)
  const newProduct = this. productsRepository.create({
    ...dto,
    title : dto.title.toLowerCase(),
    user
  }) ;
     return await this.productsRepository.save(newProduct)

}

public async getall(title? : string , maxPrice? : string , minPrice?:string) {
const filter = {
  ...(title ?{title :Like (`%${title.toLowerCase()}%`) }:{}) ,
  ...(minPrice&&maxPrice?{ price : Between(parseInt(minPrice),parseInt(maxPrice)) }:{})
}
return await this.productsRepository.find({where : filter})
}

  //    if (minPrice && maxPrice) {
// return await this.productsRepository.find({where : { price : Between(parseInt(minPrice),parseInt(maxPrice)) }}  )
//   }
//  return await this.productsRepository.find()
// }

public async getId(id : number){
const  product = await this .productsRepository.findOne({where : {id}})
if(!product) throw new NotFoundException("product not found");
return product
}

public async updateproduct(id : number , dto : ProductUpdateDto ){
    const product = await this.productsRepository.findOne({where :{id},relations :{user : true , reviews : true}})
    if(!product) throw new NotFoundException("product not found");
     
    product.title = dto.title ?? product.title ;
    product.description = dto.description ?? product.description ;
    product.price = dto.price ?? product.price ;

    return this.productsRepository.save(product)
}

  public async delete(id : number){
  const product = await this.getId(id)
  await this.productsRepository.remove(product)
  return { massage : 'product delete successfully'}

  }
}