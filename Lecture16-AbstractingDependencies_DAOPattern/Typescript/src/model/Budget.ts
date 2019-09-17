export class Budget {
  constructor(
    public id?: string,
    public month?: string,
    public year?: number,
    public monthlyAllowance?: number
  ) {
    this.id = id;
    this.month = month;
    this.year = year;
    this.monthlyAllowance = monthlyAllowance;
  }

  toString(): string {
    let m = this.month!.substring(0, 1).toUpperCase() + this.month!.substring(1);
    return `${m} ${this.year}'s Budget\nMonthly Allowance: $${Number(this.monthlyAllowance!).toFixed(2)}`;
  }
}