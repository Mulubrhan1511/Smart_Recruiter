import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ResetPasswordDto {

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}