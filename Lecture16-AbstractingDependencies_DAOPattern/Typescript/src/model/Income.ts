export class Income {
  constructor(
    public id?: string,
    public projected?: number,
    public actual?: number
  ) {
    this.id = id;
    this.projected = projected;
    this.actual = actual;
  }

  toString(): string {
    return `Projected Income: $${Number(this.projected).toFixed(2)}\nActual Income: $${Number(this.actual).toFixed(2)}`;
  }

  equals(other: object): boolean {
    if (other == this) return true;
    if (!other) return false;
    if (typeof other != typeof this) return false;

    let o = <Income>other;

    return this.id === o.id
      && this.projected === o.projected
      && this.actual === o.actual;
  }
}