import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    avatarUrl: string;

    @IsString()
    fieldOfStudy: string;

    @IsString()
    location: string;

    @IsString()
    university: string;

    @IsString({ each: true })
    skills: string[];

    @IsString()
    experience: string;

    

    
}
