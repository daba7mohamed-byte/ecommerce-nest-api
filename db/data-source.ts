import { product } from "../src/prodcuts/product.entity";
import { User } from "../src/users/entity.user";
import { Review } from "../src/review/review.entity";
import { DataSource  , DataSourceOptions} from "typeorm";
import { config } from "dotenv";

config({path : ".env"});

export const DataSourcepptions :DataSourceOptions = {
    type : "postgres",
    url : process.env.DATABASE_URL,
    entities : [product , User , Review],
    migrations: [__dirname + '/../src/migrations/*{.ts,.js}'],
    synchronize: false
}

const dataSource = new DataSource(DataSourcepptions)
export default dataSource ;