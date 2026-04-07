import { Query,Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductCreateDto } from "./product.create.dto";
import { ProductUpdateDto } from "./product.update.dto";
import { currrentuser } from '../users/decorators/current-user.decorator';
import type { Jwtpayloadtype } from "../users/dto/Jwtpayloadtype";
import { Roles } from '../users/decorators/user-roles.decorator';
import { UserType } from '../users/enum/usertype.user';
import { authguard } from "../users/guard/auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { ApiQuery ,ApiOperation , ApiSecurity } from "@nestjs/swagger";
import { SkipThrottle, Throttle } from "@nestjs/throttler";

@ApiTags('Products Group')  // swagger tag for grouping endpoints
@Controller("/app")
export class ProductController{
    constructor(private readonly productservice : ProductService ,){}
    
    @Post("/createproduct")
    @UseGuards(authguard)
    @Roles(UserType.ADMIN)
    createproduct(@Body() dto :ProductCreateDto , @currrentuser() payload :Jwtpayloadtype){
    return this.productservice.createProduct(dto ,payload.id) 
    }
 
    @Get("/getproduct") 

    @ApiOperation({ summary: 'Get all products with optional filters' })
    @ApiQuery({ name: 'title', required: false, description: 'Filter by product title' }) // اختيار swagger لفلترة المنتجات بالtitle
    @ApiQuery({ name: 'maxprice', required: false, description: 'Filter by maximum price' })
    @ApiQuery({ name: 'minprice', required: false, description: 'Filter by minimum price' })
    getproduct(
        @Query('title') title :string,
        @Query('maxprice') maxPrice :string,
        @Query('minprice') minPrice :string
    ){
    return this.productservice.getall(title , maxPrice , minPrice) 
    }
    
    @Get("/getproduct/:id")
    @SkipThrottle() // لتخطي الحماية من الهجمات الbrute force على هذا الendpoint
    getId(@Param('id', ParseIntPipe) id :number){
    return this.productservice.getId(id) 
    }

    @Put("/updateproduct/:id")
    @Throttle({default :{ ttl: 10000, limit: 5 }})
    @ApiSecurity('bearer')
    @UseGuards(authguard)
    @Roles(UserType.ADMIN)
    updateproduct(@Param('id', ParseIntPipe) id :number , @Body() dto: ProductUpdateDto){
    return this.productservice.updateproduct(id , dto)
    }

    @Delete("/deleteproduct/:id")
    @UseGuards(authguard)
    @Roles(UserType.ADMIN)
    deleteproduct(@Param('id',ParseIntPipe) id : number){
    return this.productservice.delete(id) 
    }

}


