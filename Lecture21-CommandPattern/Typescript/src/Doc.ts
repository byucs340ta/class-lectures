import { IDoc } from './IDoc';
import { ISequence } from './ISequence';
import { Sequence } from './Sequence';

export class Doc implements IDoc {
  sequence: ISequence;
  length: number;
  cursor: number;

  private fs = require('fs');

  constructor(sequence: ISequence) {
    this.sequence = sequence;
    this.length = 0;
    this.cursor = 0;
  }

  insert(pos: number, s: string): void {
    this.sequence.insert(pos, s);
    this.length += s.length;
    this.cursor += s.length;
  }
  delete(pos: number, count: number): boolean {
    try {
      this.sequence.delete(pos, count);
      this.length -= count;
      this.cursor = pos;
      return true;
    } catch (error) {
      throw new Error('Error while deleting');
    }
  }

  display(): void {
    this.sequence.print();
  }

  save(fileName: string): void {
    console.log(this.sequence.toString());
    this.fs.writeFileSync(fileName, this.sequence.toString(), (err: any) => {
      console.log(err ? err : `Document saved in ${fileName}`);
    });
  }

  open(fileName: string): void {
    let data: string = this.fs.readFileSync(fileName, 'utf8');
    data ? this.sequence = new Sequence(data) : console.log(`Error reading file ${fileName}`);
  }

  clear(): void {
    this.sequence.clear();
    this.length = 0;
    this.cursor = 0;
  }
}