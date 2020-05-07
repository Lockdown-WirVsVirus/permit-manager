import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { createHash } from "crypto"

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

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
}
