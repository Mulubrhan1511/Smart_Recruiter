import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Param, HttpException, Patch, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { create } from "domain";
import { CreateUserDto } from "./dto/CreateUser.dto";
import mongoose from "mongoose";
import { UpdateUser } from "./dto/UpdateUser.dto";
import { SiginUserDto } from "./dto/SiginUserDto.dto";
import { VerfyUserDto } from "./dto/VerfyUserDto.dto";
import { UserProfilesDto } from "./dto/UserProfile.dto";
import { ResetPasswordDto } from "./dto/ResetPasswordDto.dto";
import { UpdateProfileDto } from "./dto/UpdateProfileDto.dto";



@Controller('users')
export class UsersController{
    constructor(private userService: UsersService){}
    
    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Post('sigin')
    @UsePipes(new ValidationPipe())
    sigin(@Body() SiginUserDto: SiginUserDto){
        return this.userService.signin(SiginUserDto);
    }

    @Post('verify')
    @UsePipes(new ValidationPipe())
    verify(@Body() verifyUser: VerfyUserDto){
        return this.userService.verify(verifyUser);
    }

    @Get()
    getUsers(){
        return this.userService.getUsers();
    }

    @Get(':id')
    @UsePipes(new ValidationPipe())
    getUserById(@Param('id') id: string){
        return this.userService.getJobById(id);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateUser(@Body() updateUser: UpdateProfileDto, @Param('id') id: string) {
        return this.userService.updateUser(updateUser, id);
    }


    @Delete(':id')
    deleteUser(@Param('id') id: string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('User Not founed', 400); 
        const deleteUser = this.userService.deleteUser(id);
        if (!deleteUser) throw new HttpException('User not found', 404);
        return;
    }

    @Post('newhr')
    @UsePipes(new ValidationPipe())
    createHr(@Body() createUserDto: CreateUserDto){
        return this.userService.createHr(createUserDto);
    }

    @Post('profile/:id')
    @UsePipes(new ValidationPipe())
    profile(@Body() userProfilesDto: UserProfilesDto, @Param('id') id: string)
    {
        return this.userService.profile(userProfilesDto, id)
    }

    @Post('forgot-password')
    @UsePipes(new ValidationPipe())
    forgotPassword(@Body() body: { email: string }) {
        const { email } = body; // Extract email from the request body object
        return this.userService.forgotPassword(email);
    }

    @Post('checkverfication')
    @UsePipes(new ValidationPipe())
    checkVerification(@Body() body: { email: string, code: string }) {
        const { email, code } = body; // Extract email and code from the request body object
        return this.userService.checkVerification(email, code);
    }

    @Post('resetpassword')
    @UsePipes(new ValidationPipe())
    resetPassword(@Body() resetPassordDto: ResetPasswordDto){
        return this.userService.resetPassword(resetPassordDto);
    }

    

    
}