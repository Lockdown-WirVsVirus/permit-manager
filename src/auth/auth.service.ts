import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { createHash } from "crypto"

export interface IJwtResponse {
    token: string;
}

export interface IJwtTokenPayload {
    roles?: string[];
}

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    // TODO: use bcrypt
    public hash(str: string) {
        return createHash("sha256").update(str).digest("hex");
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const hashedPassword = this.hash(pass);
        const user = await this.usersService.findOne(username);
        if (user && user.hashedPassword === hashedPassword) {
            const { hashedPassword, ...result } = user;
            return result;
        }
        return null;
    }

    async generateToken(): Promise<IJwtResponse> {
        const jwtPayload: IJwtTokenPayload = {
        };
        return Promise.resolve({
            token: this.jwtService.sign(jwtPayload),
            jwtPayload,
        });
    }

    async verifyToken(jwt: string): Promise<IJwtTokenPayload> {
        return this.jwtService.verifyAsync<IJwtTokenPayload>(jwt);
    }
}
