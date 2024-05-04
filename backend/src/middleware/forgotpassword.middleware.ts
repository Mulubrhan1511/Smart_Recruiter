import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../user/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ForgotPasswordMiddleware implements NestMiddleware {
    constructor(private readonly userService: UsersService,
        private readonly configService: ConfigService,
    ) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        const {authorization} = req.headers
        //authorization === Bearer then token
        if(!authorization){
            return res.status(401).json({error:"YOU must logged in"})
        }
        
        const token = authorization.replace("Bearer ","")
        if (!token) {
            throw new UnauthorizedException("Token is missing");
        }
        
        
        try {

            const loginToken = this.configService.get<string>('forgot_password_token'); // Retrieve login_token from .env
            
            
            const payload = jwt.verify(token, loginToken) as { userId: string, exp: number };
            const user = await this.userService.getUserById(payload.userId);
            if(!user) return res.status(401).json({error:"YOU must logged in"})
            next();
        } catch (error) {
            throw new UnauthorizedException("Token is missing");
          }
        
      }
}