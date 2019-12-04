
/**
 * A Stack is a last-in, first-out collection.
 * Only the most-recently inserted value can be accessed.
 *
 * DOMAIN:
 *    Elements: a sequence of values [E(1), E(2), ..., E(n)],
 *              where value E(i) was inserted before value E(i+1).
 *    Size: n, the number of values currently in Elements
 * 
 * {@invariant size() >= 0}
 */
public interface Stack {
	
	/**
	 * Inserts a new value into the stack
	 * 
	 * @param value Value being inserted
	 * 
	 * {@pre !isFull()}
	 * 
	 * {@post !isEmpty()}
	 * {@post E(size()) == top() == value}
	 * {@post size() == old(size()) + 1}
	 */
	void push(Object value);
	
	/**
	 * Returns the most recently pushed value without removing it
	 * 
	 * {@pre !isEmpty()}
	 * 
	 * {@return the most recently pushed value, E(size())}
	 * {@post the stack is unchanged}
	 */
	Object top();
	
	/**
	 * Removes and returns the most recently pushed value
	 * 
	 * {@pre !isEmpty()}
	 * 
	 * {@return old(top())}
	 * {@post old(top()) has been removed from the stack}
	 * {@post size() == old(size()) - 1}
	 * {@post !isFull()}
	 */
	Object pop();
	
	/**
	 * Returns the number of values in the stack
	 * 
	 * {@pre none}
	 * 
	 * {@return the number of values in the stack}
	 * {@post the stack is unchanged}
	 */
	int size();
	
	/**
	 * Is the stack empty?
	 * 
	 * {@pre none}
	 * 
	 * {@return true if size() == 0, false otherwise}
	 * {@post the stack is unchanged}
	 */
	boolean isEmpty();
	
	/**
	 * Is the stack full?
	 * 
	 * {@pre none}
	 * 
	 * {@return true if the stack cannot accept more values (i.e., the next call to push will fail)}
	 * {@post the stack is unchanged}
	 */
	boolean isFull();
}