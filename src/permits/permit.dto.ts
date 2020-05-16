import { Reason, PermitCode } from './permit.service';
import { IsNotEmpty } from 'class-validator';

export class PermitRequest {
    @IsNotEmpty()
    reason: Reason;
}

export class PermitResponse implements PermitCode {
    reasonAbbrevation: string;
    code: string;
}
