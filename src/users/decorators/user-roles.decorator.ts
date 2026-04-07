import { SetMetadata } from "@nestjs/common";
import {UserType} from "../enum/usertype.user"


export const Roles = (...roles : UserType[])=>SetMetadata('roles' ,roles)
