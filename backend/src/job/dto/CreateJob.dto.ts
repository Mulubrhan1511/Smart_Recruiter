import { IsString, IsNotEmpty, IsNumber, IsDate, IsDateString, IsOptional } from 'class-validator';

export class CreateJobDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsString({ each: true })
    skills: string[];


    @IsNotEmpty()
    @IsString()
    company: string;

    @IsNotEmpty()
    @IsString()
    salary: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsNumber()
    totalApplicants: number;

    

    @IsOptional()
    @IsDateString()
    expiryDate: Date;
}
