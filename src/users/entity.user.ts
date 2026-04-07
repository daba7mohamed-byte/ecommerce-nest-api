import { product } from "../prodcuts/product.entity";
import { Review } from "../review/review.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "./enum/usertype.user";
import { Exclude } from "class-transformer";


@Entity("users")
export class User{
 
    @PrimaryGeneratedColumn() 
    id:number

    @Column({ nullable: true })
    username :string 

    @Column({ type : "varchar" , length :"50" })
    email : string

    
    @Column({ type : "varchar" , length :"150" })
    @Exclude()
    password : string

    @Column({default: UserType.NORMAL_USER })
    TypeUser : UserType

    @Column({default : false })
    isAccountVerified : boolean 

    @Column({type: 'varchar' , nullable : true})
    verificationToken : string | any
    
    @Column({type: 'varchar',nullable  : true , default : null})
    profileIamge : string | null 

    @OneToMany(()=>product , (product)=>product.user)
    products : product[]

    @OneToMany(()=>Review , (review)=>review.user)
    reviews : Review[]

}