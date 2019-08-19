
import { Comparable } from './Comparable';


export class MyString implements Comparable<MyString> {

	public value: string;
	
	constructor(v: string) {
		this.value = v;
	}
	
	public compareTo(other: MyString): number {
		return this.value.localeCompare(other.value);
	}
}