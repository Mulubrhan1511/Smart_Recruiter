import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { RequiredLoginMiddleware } from "src/middleware/requiredlogin.middleware";
import { ConfigModule } from '@nestjs/config';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            }
        ]),
        ConfigModule.forRoot(), // Import ConfigModule here
    ],
    providers: [UsersService, RequiredLoginMiddleware],
    controllers:[UsersController],
    exports:[UsersService]
})

export class UsersModule{}
