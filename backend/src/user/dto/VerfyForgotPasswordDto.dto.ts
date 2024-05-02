import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
export class VerfyForgotPasswordDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    verificationCode: string;
}