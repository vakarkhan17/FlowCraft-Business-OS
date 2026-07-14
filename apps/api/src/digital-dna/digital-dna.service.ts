import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export type DnaObject = 'TEN' | 'CMP' | 'BRN' | 'USR' | 'CUR' | 'GRP' | 'LEN' | 'PLT' | 'BUN' | 'DIV' | 'DEP' | 'SEC' | 'TEM' | 'LOC' | 'CCT' | 'PCT' | 'ORG' | 'CTY' | 'TER' | 'CON' | 'UOM' | 'IGR' | 'ICA' | 'BRD' | 'MFR' | 'ITM' | 'WHS' | 'WHZ' | 'BIN' | 'BPR';

@Injectable()
export class DigitalDnaService {
  create(type: DnaObject, context?: string): string {
    if (type === 'CUR' && context) return `FC-CUR-${this.segment(context)}`;
    const sequence = randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase();
    const middle = context ? `-${this.segment(context)}` : '';
    return `FC-${type}${middle}-${sequence}`;
  }

  assertUnchanged(current: string, proposed?: string): void {
    if (proposed !== undefined && proposed !== current) {
      throw new Error('Digital DNA is immutable');
    }
  }

  private segment(value: string): string {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16);
  }
}
