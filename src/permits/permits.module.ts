import { Module } from '@nestjs/common';
import { PermitController } from './permit.controller';
import { PermitService } from './permit.service';
import { AuthService } from './../auth/auth.service';
import { UsersService } from './../users/users.service';

@Module({
    controllers: [PermitController],
    providers: [AuthService, UsersService, PermitService],
})
export class PermitsModule {}
