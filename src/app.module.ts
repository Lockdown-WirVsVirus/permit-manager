import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PermitsModule } from './permits/permits.module';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            // if a variable is found in multiple files, the first one takes precedence.
            envFilePath: ['.env.local', '.env'],
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        AuthModule,
        UsersModule,
        PermitsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor() {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            console.error('no MONGODB_URI found. Please set.');
            process.exit(1);
        }
    }
}
