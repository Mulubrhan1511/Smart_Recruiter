import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/users.module';
import { JobModule } from './job/job.module';
import { RequiredLoginMiddleware } from './middleware/requiredlogin.middleware';
import { RequiredAdminMiddleware } from './middleware/requiredadmin.middleware';
import { ConfigModule } from '@nestjs/config';
import { ForgotPasswordMiddleware } from './middleware/forgotpassword.middleware';

@Module({
  
  imports: [
    MongooseModule.forRoot(process.env.MONGOURI), // Use the MONGOURI environment variable
    UsersModule,
    JobModule,
    ConfigModule.forRoot({ envFilePath: '.env' }), // Specify the .env file path here
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Middleware for routes requiring login
    consumer
      .apply(RequiredLoginMiddleware)
      .forRoutes(
        { path: 'jobs/apply', method: RequestMethod.POST },
        { path: 'jobs/getapplyjob/:id', method: RequestMethod.GET },
        { path: 'users/profile/:id', method: RequestMethod.PATCH },
        { path: 'users/verify', method: RequestMethod.POST },
        { path: 'users/:id', method: RequestMethod.PATCH },
        { path: 'users/:id', method: RequestMethod.DELETE },
      );

    // Middleware for routes requiring admin privileges
    consumer
      .apply(RequiredAdminMiddleware)
      .forRoutes(
        { path: 'jobs', method: RequestMethod.POST },
        { path: 'jobs/approve', method: RequestMethod.POST },
        { path: 'jobs/:id', method: RequestMethod.PATCH },
        { path: 'users/newhr', method: RequestMethod.POST },
      );

    // Middleware for routes related to password reset
    consumer
      .apply(ForgotPasswordMiddleware)
      .forRoutes(
        { path: 'users/resetpassword', method: RequestMethod.POST },
        { path: 'users/checkverfication', method: RequestMethod.POST },
      );
  }
}
