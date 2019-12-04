


interface Stack {

	void push(Object value);

	Object top();
	
	Object pop();
	
	int size();
	
	boolean isEmpty();
	
	boolean isFull();
}


class ArrayStack implements Stack {

	...
}


class LinkedStack implements Stack {

	...
}