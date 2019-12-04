
public class Array<T> {

	private T[] elements;


	public Array(int size) {
		if (size < 0) {
			throw new IllegalArgumentException();
		}
		elements = (T[])new Object[size];
	}


	public T get(int index) {
		if (index < 0 || index >= elements.length) {
			throw new IndexOutOfBoundsException();
		}
		return (T)elements[index];
	}


	public void set(int index, T value) {
		if (index < 0 || index >= elements.length) {
			throw new IndexOutOfBoundsException();
		}
		elements[index] = value;
	}

	
	public static void main(String[] args) {
		Array<Integer> intArr = new Array<Integer>(10);

		intArr.set(5, 999);
		int val = intArr.get(5);

		System.out.println(val);
	}
	
}


class Helpers {

	static <T> void copy(T[] src, Collection<? super T> dest) {
		...
	}

	
	static <T> void sort(T[] a, Comparator<? super T> c) {
		...
	}

}


