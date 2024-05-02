import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { Job,JobSchema } from 'src/schemas/Job.schema';
import { UsersModule } from 'src/user/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Job.name,
        schema: JobSchema,
      }
    ]),
    UsersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
