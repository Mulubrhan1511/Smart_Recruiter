import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UserProfilesDto {

    @IsNotEmpty()
    @IsString()
    fieldOfStudy: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    university: string;

    @IsOptional()
    skills: string[];

    @IsNotEmpty()
    @IsString()
    experience: string;


}