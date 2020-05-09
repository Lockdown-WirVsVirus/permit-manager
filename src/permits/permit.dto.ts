import { Reason, PermitCode } from "./permit.service";

export class PermitRequest {
    reason: Reason;
}

export class PermitResponse implements PermitCode {
    reasonAbbrevation: string;
    code: string;
}