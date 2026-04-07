import { Test , TestingModule} from "@nestjs/testing";
import { ProductService } from "./product.service";
import { AppService } from "../users/user.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { product } from "./product.entity";
import { Repository } from "typeorm";
import { ProductCreateDto } from "./product.create.dto";

type productTestType = {
  id: number;
  title: string;
  description: string;
  price: number;
};

describe('ProductService', () => {
  let productservice : ProductService; 
  let productRepository : Repository<product>;
  let createProductDto : ProductCreateDto = {
    title: "book",
    description: "a book",
    price: 10
  };

let productTest : productTestType = {
  id: 1,
  title: "book",
  description: "a book",
  price: 10
};

  beforeEach(async () => {
       const module : TestingModule = await Test.createTestingModule({
          providers: [
            ProductService,
            {provide : AppService , useValue : {
                getcurrentuser : jest.fn((userId : number) => Promise.resolve({id : userId }))
            }},
            {provide : getRepositoryToken(product) , useValue : {
                create : jest.fn((dto : ProductCreateDto) =>  dto),
                save : jest.fn((product : product) => Promise.resolve({...product , id : 1}))
            }}

          ]
       }).compile();

       productservice = module.get<ProductService>(ProductService);
       productRepository = module.get<Repository<product>>(getRepositoryToken(product))
    })
    it('should be defined' , () => {
        expect(productservice).toBeDefined();
    })
 
    it('should productRepository be defined' , () => {
        expect(productRepository).toBeDefined();
    })
    describe('ProductsService', () => {
  describe('createProduct()', () => {
    it("should call 'create' method in product repository", async () => {
      await productservice.createProduct(createProductDto, 1);
      expect(productRepository.create).toHaveBeenCalled();
      expect(productRepository.create).toHaveBeenCalledTimes(1);
    });

    it("should call 'save' method in product repository", async () => {
      await productservice.createProduct(createProductDto, 1);
      expect(productRepository.save).toHaveBeenCalled();
      expect(productRepository.save).toHaveBeenCalledTimes(1);
    });

    it("should create a new product", async () => {
      const result = await productservice.createProduct(createProductDto, 1);
      expect(result).toBeDefined();
      expect(result.title).toBe("book");
      expect(result.id).toBe(1);
    });
  });
});
})

