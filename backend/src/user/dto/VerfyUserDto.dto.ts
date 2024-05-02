import { IsNotEmpty, IsString } from "class-validator";

export class VerfyUserDto {
    @IsString()
    @IsNotEmpty()
    verificationCode: string;

    @IsString()
    @IsNotEmpty()
    id: string;
}