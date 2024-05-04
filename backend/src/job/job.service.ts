import { Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/CreateJob.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'src/schemas/Job.schema';
import { Model } from 'mongoose';
import { ApplyJobDto } from './dto/ApplyJobDto.dto';
import { Types } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UsersService } from 'src/user/users.service';
import { UserApprovalDto } from './dto/UserApprovalDto.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JobService {
    constructor(
        @InjectModel(Job.name) private jobModel: Model<Job>,
        private readonly userService: UsersService,
        private readonly configService: ConfigService,
    ) {}

    findAll(){
        return this.jobModel.find();
    }
    
    async createjob(createJobDto: CreateJobDto): Promise<any> {

        const newJob = new this.jobModel(createJobDto);
        
        await newJob.save();
        return newJob;
    }

    async applyJob(applyJobDto: ApplyJobDto): Promise<any> {
        if (applyJobDto.id.length !== 24) {
            return "Invalid job ID";
        }
    
        // Find the job by its ID
        const job = await this.jobModel.findById(applyJobDto.id);
        if (!job) {
            return "Job not found";
        }
    
        // Check if the user is already in the applicants array of the job
        const existingApplicant = job.applicants.find(applicant => applicant.user.equals(applyJobDto.userId));
        if (existingApplicant) {
            return "User has already applied for this job";
        }
    
        if (applyJobDto.userId.length !== 24) {
            return "Invalid user ID";
        }
    
        // Find the user by ID
        const user = await this.userService.getUserById(applyJobDto.userId);
        if (!user) {
            return "User not found";
        }
    
        // Add the application details to the job
        job.applicants.push({
            user: user._id,
            status: 'pending',
            resume: applyJobDto.resume,
            fieldOfStudy: applyJobDto.fieldOfStudy,
            location: applyJobDto.location,
            name: applyJobDto.name,
        });
    
        // Update the job document in the database
        await job.save();
    
        return "Application submitted successfully";
    }
    

    async approveUser(userApprovalDto: UserApprovalDto): Promise<any> {
        if(userApprovalDto.jobId.length !== 24 && userApprovalDto.userId.length !== 24){
            return "Invalid job ID or user ID";
        }
    
        // Find the job by its ID
        const job = await this.jobModel.findById(userApprovalDto.jobId);
    
        if (!job) {
            return "Job not found";
        }
        
        // Find the user by its ID
        const user = await this.userService.getUserById(userApprovalDto.userId);
    
        if (!user) {
            return "User not found";
        }
    
        // Find the applicant in the job's applicants array
        const applicant = job.applicants.find(applicant => applicant.user.equals(user._id));
        if (!applicant) {
            return "User has not applied for this job";
        }
    
        // Update the status and reason of the applicant
        applicant.status = userApprovalDto.status;
    
        const my_email = this.configService.get<string>('my_email'); // Retrieve login_token from .env
        const pass = this.configService.get<string>('password'); // Retrieve login_token from .env

        const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: my_email,
                    pass: pass
                }
        });
    
        let mailOptions;
        if (userApprovalDto.status === 'interview') {
            // Email template for interview invitation
            mailOptions = {
                from: my_email,
                to: user.email,
                subject: `Interview Invitation for ${job.title}`,
                html: `<p>Hi ${user.name},</p>` +
                    `<p>Congratulations! You have been selected for an interview for the position of ${job.title}.</p>` +
                    `<p>Please find the details below:</p>` +
                    `<p>Date: ${userApprovalDto.interview}</p>` +
                    `<p>Location: XYZ Office</p>` +
                    `<p>We look forward to meeting you!</p>`
            };
        } else {
            // Email template for rejection notification
            mailOptions = {
                from: my_email,
                to: user.email,
                subject: `Application Update for ${job.title}`,
                html: `<p>Hi ${user.name},</p>` +
                    `<p>We regret to inform you that your application for the position of ${job.title} has been unsuccessful.</p>` +
                    `<p>We appreciate your interest and wish you the best of luck in your job search.</p>`
            };
        }
    
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    
        job.save();
    
        return job;
    }
    

    async getJobById(id: string): Promise<any> {
        const job = await this.jobModel.findById(id);
        if (!job) {
            return "Job not found";
        }
    
        return job;
    } 

    async getApplyJob(userId: string): Promise<any> {
        // First, ensure the user exists
        const user = await this.userService.getUserById(userId);
        if (!user) {
            return "User not found";
        }
    
        // Now, find jobs where the applicants array contains the user's ID
        const jobs = await this.jobModel.find({
            "applicants.user": user._id
        });
    
        return jobs;
    }
    
       
        
}
