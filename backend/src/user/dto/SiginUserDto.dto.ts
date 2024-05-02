import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SiginUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}