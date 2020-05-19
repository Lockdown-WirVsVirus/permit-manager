import { Reason, PermitCode } from './permit.service';
import { IsNotEmpty, Min, Max, Matches, MinLength, IsPositive, isPositive } from 'class-validator';

export class PermitRequest {
    @IsNotEmpty()
    @MinLength(2)
    reason: Reason;
}

export class NumberOfRequestParam{
    @IsNotEmpty()
    numberOfPermits: number;
}

export class PermitResponse implements PermitCode {
    reasonAbbrevation: string;
    code: string;
}
