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

    findAll() {
        
        return this.jobModel.find().sort({ date: -1 });
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
    
        
        const user = await this.userService.getUserById(applyJobDto.userId);
        if (!user) {
            return "User not found";
        }
    
        
        job.applicants.push({
            user: user._id,
            status: 'pending',
            resume: applyJobDto.resume,
            
        });
    
        
        await job.save();
    
        return "Application submitted successfully";
    }
    

    async approveUser(userApprovalDto: UserApprovalDto): Promise<any> {
        if(userApprovalDto.jobId.length !== 24 && userApprovalDto.userId.length !== 24){
            return "Invalid job ID or user ID";
        }
    
        
        const job = await this.jobModel.findById(userApprovalDto.jobId);
    
        if (!job) {
            return "Job not found";
        }
        
        
        const user = await this.userService.getUserById(userApprovalDto.userId);
    
        if (!user) {
            return "User not found";
        }
    
        
        const applicant = job.applicants.find(applicant => applicant.user.equals(user._id));
        if (!applicant) {
            return "User has not applied for this job";
        }
    
        
        applicant.status = userApprovalDto.status;
    
        const my_email = this.configService.get<string>('my_email'); 
        const pass = this.configService.get<string>('password'); 

        const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: my_email,
                    pass: pass
                }
        });
    
        let mailOptions;
        if (userApprovalDto.status === 'interview') {
            
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
        
        const user = await this.userService.getUserById(userId);
        if (!user) {
            return "User not found";
        }
    
        
        const jobs = await this.jobModel.find({
            "applicants.user": user._id
        });
    
        return jobs;
    }
    
    async updateJob(createJobDto: CreateJobDto, id: string): Promise<any> {
        if (id.length !== 24) {
            return "Invalid job ID";
        }
    
        const job = await this.jobModel.findById(id);
        if (!job) {
            return "Job not found";
        }
        job.title = createJobDto.title;
        job.description = createJobDto.description;
        job.location = createJobDto.location;
        job.salary = createJobDto.salary;
        job.company = createJobDto.company;
        job.experience = createJobDto.experience;
        job.skills = createJobDto.skills;
        job.expiryDate = createJobDto.expiryDate;
        job.type = createJobDto.type;
        job.totalApplicants = createJobDto.totalApplicants;

        await job.save();
    
        return job;
    }
}
