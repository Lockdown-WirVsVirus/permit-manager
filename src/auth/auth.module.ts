import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';

@Global()
@Module({
    imports: [
        // loading JwtModule async to have access to process.env via ConfigService
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: process.env.JWT_SECRET || '&E)H@McQfTjWnZr4u7ShVmYq3t6w9y$B',
            }),
        }),
        UsersModule,
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
