import { ISequence } from './ISequence';

export class Sequence implements ISequence {

  private sequence: string = '';

  constructor(sequence?: string) {
    if (sequence) this.sequence = sequence;
  }

  print(): void {
    console.log(this.toString());
  }
  insert(pos: number, s: string): void {
    this.sequence = this.sequence.substr(0, pos) + s + this.sequence.substr(pos);
  }
  delete(pos: number, count: number): void {
    let s = this.sequence.split('');
    s.splice(pos, count);
    this.sequence = s.join('');
  }
  clear(): void {
    this.sequence = '';
  }

  toString(): string {
    return this.sequence.toString();
  }
}