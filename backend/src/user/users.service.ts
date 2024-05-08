import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUser } from "./dto/UpdateUser.dto";
import * as bcrypt from 'bcrypt';
import { SiginUserDto } from "./dto/SiginUserDto.dto";
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { VerfyUserDto } from "./dto/VerfyUserDto.dto";
import { UserProfilesDto } from "./dto/UserProfile.dto";
import { ResetPasswordDto } from "./dto/ResetPasswordDto.dto";
import { ConfigService } from '@nestjs/config';
import { UpdateProfileDto } from "./dto/UpdateProfileDto.dto";




@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly configService: ConfigService, // Inject ConfigService
    ) {}
    
   

    async createUser(createUserDto: CreateUserDto): Promise<any> {
        // Check if the email already exists
        const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
        if (existingUser) {
            return false;
        }

        // Generate a verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash the verification code (optional)
        const hashedVerificationCode = await bcrypt.hash(verificationCode, 10);

        // Hash the password with 10 rounds of salt
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        // Create a new user object with the hashed password and verification code
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
            verificationCode: hashedVerificationCode
        });

        // Save the new user to the database
        await newUser.save();

        const my_email = this.configService.get<string>('my_email'); // Retrieve login_token from .env
        const pass = this.configService.get<string>('password'); // Retrieve login_token from .env

        const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: my_email,
                    pass: pass
                }
        });

        const mailOptions = {
            from: my_email,
            to: newUser.email,
            subject: 'Welcome to our Application! Verify Your Email',
            html: `<p>Hi ${newUser.name},</p>` +
                `<p>Welcome to our application! To get started, please use the following verification code:</p>` +
                `<p><strong><h1>${verificationCode}</h1></strong></p>` +
                `<p>This code will expire after a certain period of time.</p>` +
                `<p>Thank you for joining us!</p>` +
                `<p>Best regards,<br>Your Application Team</p>`
        };
               

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        // Return the newly created user
        return newUser;
    }
    async createHr(createUserDto: CreateUserDto): Promise<any> {
        // Check if the email already exists
        const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
        if (existingUser) {
            return false;
        }

        // Generate a verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash the verification code (optional)
        const hashedVerificationCode = await bcrypt.hash(verificationCode, 10);

        // Hash the password with 10 rounds of salt
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        // Create a new user object with the hashed password and verification code
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
            verificationCode: hashedVerificationCode,
            type:'admin'
        });

        // Save the new user to the database
        await newUser.save();

        // Send email with verification code to the new user
        const my_email = this.configService.get<string>('my_email'); // Retrieve login_token from .env
        const pass = this.configService.get<string>('password'); // Retrieve login_token from .env

        const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: my_email,
                    pass: pass
                }
        });

        const mailOptions = {
            from: my_email,
            to: newUser.email,
            subject: 'Welcome to our Application! Verify Your Email',
            html: `<p>Hi ${newUser.name},</p>` +
                `<p>Welcome to our application! To get started, please use the following verification code:</p>` +
                `<p><strong><h1>${verificationCode}</h1></strong></p>` +
                `<p>This code will expire after a certain period of time.</p>` +
                `<p>Thank you for joining us!</p>` +
                `<p>Best regards,<br>Your Application Team</p>`
        };
               

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                
            }
        });

        // Return the newly created user
        return newUser;
    }


    async signin(SiginUserDto: SiginUserDto) {
        const user = await this.userModel.findOne({ email: SiginUserDto.email }).exec();
        
        if (!user) {
            // User not found, return false or throw an error
            return false;
        }
    
        // Compare passwords
        const domatch = await bcrypt.compare(SiginUserDto.password, user.password);
    
        if (!domatch) {
            // Passwords don't match, return false or throw an error
            return false;
        }
    
        // Generate JWT token
        const loginToken = this.configService.get<string>('login_token'); // Retrieve login_token from .env
        const token = jwt.sign({ _id: user._id }, loginToken);
    
        const { _id, email, name, verified, type, profile } = user;
    
        // Return user and token
        return { user: { _id,email, name, verified, type, profile }, token };
    }

    async verify(verifyUser: VerfyUserDto) {
        const user = await this.userModel.findById(verifyUser.id).exec();

        const domatch = await bcrypt.compare(verifyUser.verificationCode, user.verificationCode);
        
        if (!domatch) {
            return false;
        }
        else{
            user.verified = true;
            await user.save();
            const { _id, email, name, verified } = user;
            return {user: { _id, email, name, verified }};
        }
    }
    

        getUsers(){
            return this.userModel.find();
        }

        getUserById(id: string){
            
            return this.userModel.findById(id);
        }
        getUserByEmail(email: string){
            return this.userModel.findOne({email: email})
        }
        async getJobById(id: string): Promise<any> {
            const job = await this.userModel.findById(id);
            if (!job) {
                return "Job not found";
            }
        
            return job;
        }  

        async profile(userProfilesDto:UserProfilesDto, id: string){
            const user = await this.userModel.findById(id).exec();
            user.profile.push(userProfilesDto);
            await user.save();
            const { _id, email, name, verified, type, profile } = user;
            return { user: { _id, email, name, verified, type, profile }};
        }

        async updateUser(updateUser: UpdateProfileDto, id: string) {
            const user = await this.userModel.findById(id);
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
    
            // Update user profile fields
            user.profile = {
                ...user.profile,
                ...updateUser,
            };
    
            // Save the updated user
            const updatedUser = await user.save();
            return updatedUser;
        }

        deleteUser(id: string){
            return this.userModel.findByIdAndDelete(id);
        }
        

        async forgotPassword(email: string): Promise<string> {
            // Find user by email
            const user = await this.getUserByEmail(email);
            
           
            if(!user){
                return "User not found";
            }

            
        
            // Generate verification code
            // Generate verification code
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            // Hash the verification code
            const hashedVerificationCode = await bcrypt.hash(verificationCode, 10);
            // Save the hashed verification code to the user document
            user.forgotVerificationCode = hashedVerificationCode;


            const my_email = this.configService.get<string>('my_email'); // Retrieve login_token from .env
            const pass = this.configService.get<string>('password'); // Retrieve login_token from .env

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: my_email,
                    pass: pass
                }
            });

            const mailOptions = {
                from: my_email,
                to: user.email,
                subject: 'Forgot Password',
                html: `<p>Hi ${user.name},</p>` +
                    `<p>Here is your verification code:</p>` +
                    `<p><strong><h1>${verificationCode}</h1></strong></p>` +
                    `<p>This code will expire after a certain period of time.</p>` +
                    `<p>Thank you!</p>` +
                    `<p>Best regards,<br>Your Application Team</p>`
            } 

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });

            const forgot_password_token = this.configService.get<string>('forgot_password_token'); // Retrieve login_token from .env
            
            
            // Generate token with 20 minutes expiry
            const token = jwt.sign({ userId: user._id }, forgot_password_token, { expiresIn: '2m' });



        
            // Save the verification code and token to the user document
            await user.save();
        
            // Send verification code to the user's email
            
            
            return token;
          }

          async checkVerification(email: string, code: string): Promise<any> {
            // Find user by email
            const user = await this.getUserByEmail(email);
            if (!user) {
                return 'User Not found';
            }
        
            // Compare the hashed verification code stored in the database with the user-provided verification code
            const domatch = await bcrypt.compare(code, user.forgotVerificationCode);
            
            
            //Check if the verification code matches
            if (domatch) {
                // Verification code matches
                return true;
            } else {
                // Verification code doesn't match
                return false;
            }
        }

        async resetPassword (resetPassordDto: ResetPasswordDto): Promise<any> {
            // Find user by email
            const user = await this.getUserByEmail(resetPassordDto.email);
            if (!user) {
                return 'User Not found';
            }
        
            
        
            
        
            // Hash the new password
            const hashedPassword = await bcrypt.hash(resetPassordDto.password, 10);
        
            // Save the new password to the user document
            user.password = hashedPassword;
        
            // Clear the verification code and token
            user.forgotVerificationCode = '';
        
            // Save the user document
            await user.save();
        
            return true;
        }

        

        
        
          
}
