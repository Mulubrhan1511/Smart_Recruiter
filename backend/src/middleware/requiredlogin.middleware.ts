import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../user/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RequiredLoginMiddleware implements NestMiddleware {
    constructor(private readonly userService: UsersService,
        private readonly configService: ConfigService,
    ) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        const {authorization} = req.headers
        
        if(!authorization){
            return res.status(401).json({error:"YOU must logged in"})
        }
        
        const token = authorization.replace("Bearer ","")
        if(!token){
            return res.status(401).json({error:"YOU must logged in"})
        }
        
        try {
            const loginToken = this.configService.get<string>('login_token');
            const payload = jwt.verify(token, loginToken) as { _id: string };
            const user = await this.userService.getUserById(payload._id);
            if(!user) return res.status(401).json({error:"YOU must logged in"})
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
          }
        
      }
}
