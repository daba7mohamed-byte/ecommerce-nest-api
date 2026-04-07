import { product } from "../prodcuts/product.entity";
import { User } from "../users/entity.user";
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";

@Entity("Revise")
export class Review {
    @PrimaryGeneratedColumn()
    id : number ;

    @Column({type : "varchar" , length: '250' })
    comment : string ;
;

    @Column({type : 'int'})
    rating : number ;

    @CreateDateColumn ({ type : "timestamp" , default : ()=> 'CURRENT_TIMESTAMP(6)'})
    createdAt : Date ;

    
    @UpdateDateColumn({ type : "timestamp" , default : ()=> 'CURRENT_TIMESTAMP(6)' , onUpdate :'CURRENT_TIMESTAMP(6)' })
    updatedAt : Date ;
   
    @ManyToOne(()=> product , (product)=>product.reviews ,{ onDelete : "CASCADE"})
    product : product
    
    @ManyToOne(()=> User , (user)=>user.reviews ,{eager : true , onDelete : "CASCADE"})
    user:User
 
}