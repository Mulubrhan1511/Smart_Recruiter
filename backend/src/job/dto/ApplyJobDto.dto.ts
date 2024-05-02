import { IsNotEmpty, IsString } from "class-validator";

export class ApplyJobDto {

    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    fieldOfStudy: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    resume: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}