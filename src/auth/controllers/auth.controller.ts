import { Controller, Post, UseGuards, Request, Logger, Get } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { LocalAuthGuard } from '../local-auth-guard';
import { AuthService, IJwtResponse } from '../auth.service';
import { JwtGuard } from '../jwt.guard';

@Controller("auth")
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Request() req: ExpressRequest): Promise<IJwtResponse> {
        this.logger.debug('login succeeded', JSON.stringify(req.user));
        const roles = (req.user as any).roles;
        return this.authService.generateToken(roles);
    }

    @UseGuards(JwtGuard)
    @Get("verify")
    verify(@Request() req: ExpressRequest) {
        const roles = (req.user as any).roles;
        return {
            authed: true,
            roles,
        }
    }
}
