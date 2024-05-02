import { IsOptional, IsString } from "class-validator";

export class UpdateUser {

    @IsOptional()
    @IsString()
    displayName?: string;

    @IsOptional()
    @IsString()
    avatarurl?: string;
}