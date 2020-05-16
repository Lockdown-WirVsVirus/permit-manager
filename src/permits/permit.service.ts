import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PermitModel } from './permits.schema';
import { Model } from 'mongoose';

export interface PermitCode {
    code: string;
    reasonAbbrevation: string;
}

export type Reason = 'TO-TOURISTIC' | 'SA-SBFANLIEGER' | 'RE-RESIDENCE';

@Injectable()
export class PermitService {
    constructor(@InjectModel('Permit') private permitModel: Model<PermitModel>) {}
    /**
     * generates a permit. Basically a unique code assigned to a reason.
     * @param reason reason of code usage
     */
    async createPermit(reason: Reason): Promise<PermitCode> {
        let n = 1;
        let permit: PermitCode;
        while (n > 0) {
            permit = {
                reasonAbbrevation: this.mapToReasonAbbreviaton(reason),
                code: this.generateCode(),
            };

            n = await this.permitModel.find(permit).count();
        }
        let permitDocument = new this.permitModel(permit);

        return permitDocument;
    }

    async createNumbersOfPermit(reason: Reason, numberOfTickes: number): Promise<PermitCode[]> {
        console.debug(numberOfTickes)
        let permitDocument: PermitCode[] = [];

        while (numberOfTickes != permitDocument.length) {
            permitDocument.push(await this.createPermit(reason));
        }

        return permitDocument;
    }

    /**
     * Map reason to abbreviation (two-chars)
     * @param reason
     */
    private mapToReasonAbbreviaton(reason: Reason) {
        return reason.slice(0, 2);
    }

    /**
     * should generate a 6-digit unique code
     */
    private generateCode(): string {
        let code = Math.random()
            .toString()
            .substr(2, 5);
        let sum = code
            .split('')
            .map(x => parseInt(x))
            .reduce((x, y) => x + y);
        // add modulo 10
        code += sum % 10;

        return code;
    }
}
