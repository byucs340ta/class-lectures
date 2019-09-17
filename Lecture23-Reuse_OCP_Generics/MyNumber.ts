
import { Comparable } from './Comparable';


export class MyNumber implements Comparable<MyNumber> {

	public value: number;
	
	constructor(v: number) {
		this.value = v;
	}
	
	public compareTo(other: MyNumber): number {
		return (this.value - other.value);
	}
}