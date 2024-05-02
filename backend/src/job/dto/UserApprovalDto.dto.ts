import { IsDate, IsDateString, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserApprovalDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    jobId: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    

    @IsOptional()
    @IsDateString()
    interview: Date;

}