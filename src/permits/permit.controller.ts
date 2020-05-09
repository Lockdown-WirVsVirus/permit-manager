import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { PermitRequest, PermitResponse } from './permit.dto';
import { PermitService } from './permit.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('permits')
export class PermitController {

    constructor(private readonly permitService: PermitService) {}

    @UseGuards(JwtGuard)
    @Post()
    @HttpCode(201)
    async createPermit(@Body() body: PermitRequest): Promise<PermitResponse> {
        return this.permitService.createPermit(body.reason);
    }
}
