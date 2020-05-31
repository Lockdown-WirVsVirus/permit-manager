import { Module } from '@nestjs/common';
import { PermitController } from './permit.controller';
import { PermitService } from './permit.service';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PERMIT_MODEL_NAME, permitSchema } from './permits.schema';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: PERMIT_MODEL_NAME, schema: permitSchema }]), UsersModule, AuthModule],
    controllers: [PermitController],
    providers: [AuthService, UsersService, PermitService],
})
export class PermitsModule {}
