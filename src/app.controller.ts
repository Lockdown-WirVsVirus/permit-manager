import { Controller, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @UseGuards(LocalAuthGuard)
  @Post()
  getHello(): string {
    return this.appService.getHello();
  }
}
