import { Review } from "../review/review.entity";
import { User } from "../users/entity.user";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class product{
    @PrimaryGeneratedColumn()
    id : number ;

    @Column({type : "varchar" , length: '150' })
    title : string ;

    @Column()
    description : string ;

    @Column({type : 'float'})
    price : number ;

    @CreateDateColumn ({ type : "timestamp" , default : ()=> 'CURRENT_TIMESTAMP(6)'})
    createdAt : Date ;

    
    @UpdateDateColumn({ type : "timestamp" , default : ()=> 'CURRENT_TIMESTAMP(6)' , onUpdate :'CURRENT_TIMESTAMP(6)' })
    updatedAt : Date ;
    
    @OneToMany(()=>Review , (review)=>review.product , {eager : true}) // relations user , review
    reviews : Review[]

    @ManyToOne(()=>User , (user)=>user.products , {eager : true})
    user : User
}