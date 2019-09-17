import { Guid } from 'guid-typescript';

export class Expense {
  constructor(
    public id?: string,
    public month?: string,
    public day?: number,
    public year?: number,
    public name?: string,
    public amount?: number,
    public budgetId?: string
  ) {
    this.id = id;
    this.month = month;
    this.day = day;
    this.year = year;
    this.name = name;
    this.amount = amount;
    this.budgetId = budgetId;
  }

  createId(): void {
    this.id = Guid.create().toString();
  }

  toString(): string {
    let m = this.month!.substring(0, 1).toUpperCase() + this.month!.substring(1);
    return `${m} ${this.day}, ${this.year} - ${this.name}: $${Number(this.amount).toFixed(2)}`;
  }

  equals(other: object): boolean {
    if (other == this) return true;
    if (!other) return false;
    if (typeof other != typeof this) return false;

    let o = <Expense>other;

    return this.id === o.id;
  }
}