import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/CreateJob.dto';
import { create } from 'domain';
import { ApplyJobDto } from './dto/ApplyJobDto.dto';
import { UserApprovalDto } from './dto/UserApprovalDto.dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createjob(@Body() createJobDto: CreateJobDto){
    return this.jobService.createjob(createJobDto);
    
  }

  @Post('apply')
  @UsePipes(new ValidationPipe())
  applyJob(@Body() applyJobDto: ApplyJobDto){
    return this.jobService.applyJob(applyJobDto);
  }

  @Post('approve')
  @UsePipes(new ValidationPipe())
  approveUser(@Body() userApprovalDto: UserApprovalDto){
    return this.jobService.approveUser(userApprovalDto);
  }

  @Post('getjobs/:id') // Define the parameter in the route URL
  @UsePipes(new ValidationPipe())
  getJobs(@Param('id') id: string){ // Use @Param() instead of @Body()
    return this.jobService.getJobById(id);
  }

  @Get('getapplyjob/:id')
  @UsePipes(new ValidationPipe())
  getApplyJob(@Param('id') id: string){
    return this.jobService.getApplyJob(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateJob(@Body() createJobDto: CreateJobDto, @Param('id') id:string){
    return this.jobService.updateJob(createJobDto, id);
  }

  

}
