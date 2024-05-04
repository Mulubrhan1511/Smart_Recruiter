import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './schemas/User.schema';
import { UsersModule } from './user/users.module';
import { JobModule } from './job/job.module';
import { RequiredLoginMiddleware } from './middleware/requiredlogin.middleware';
import { RequiredAdminMiddleware } from './middleware/requiredadmin.middleware';
import { ConfigModule } from '@nestjs/config';
import { ForgotPasswordMiddleware } from './middleware/forgotpassword.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nest'),
    UsersModule,
    JobModule,
    ConfigModule.forRoot({ envFilePath: '.env' }), // Specify the .env file path here
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequiredAdminMiddleware)
      .forRoutes({ path: 'jobs', method: RequestMethod.POST });
    
    consumer
      .apply(RequiredLoginMiddleware)
      .forRoutes({ path: 'jobs/apply', method: RequestMethod.POST });
    
    consumer
      .apply(RequiredAdminMiddleware)
      .forRoutes({ path: 'jobs/approve', method: RequestMethod.POST });

    consumer
      .apply(RequiredAdminMiddleware)
      .forRoutes({ path: 'newhr', method: RequestMethod.POST });

    consumer
      .apply(RequiredLoginMiddleware)
      .forRoutes({ path: 'profile/:id', method: RequestMethod.PATCH });

    consumer
      .apply(ForgotPasswordMiddleware)
      .forRoutes({path: 'users/resetpassword',method:RequestMethod.POST})

    consumer
      .apply(ForgotPasswordMiddleware)
      .forRoutes({path: 'users/checkverfication',method:RequestMethod.POST})
  }
}
