import { Module } from '@nestjs/common';
import { PermitController } from './permit.controller';
import { PermitService } from './permit.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Module({
    controllers: [
        PermitController,
    ],
    providers: [
        AuthService,
        UsersService,
        PermitService,
    ]
})
export class PermitsModule {

}
