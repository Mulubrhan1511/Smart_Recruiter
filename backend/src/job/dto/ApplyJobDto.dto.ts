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
    resume: string;

}