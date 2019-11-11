
/**
 * The Stack interface defines a last-in, first-out collection
 */
public interface Stack {
	
	/**
	 * Inserts a new value into the stack
	 * 
	 * @param value Value being inserted
	 */
	void push(Object value);
	
	/**
	 * Returns the most recently pushed value without removing it
	 */
	Object top();
	
	/**
	 * Removes and returns the most recently pushed value
	 */
	Object pop();
	
	/**
	 * Returns the number of values in the stack
	 */
	int size();
	
	/**
	 * Is the stack empty?
	 */
	boolean isEmpty();
	
	/**
	 * Is the stack full?
	 */
	boolean isFull();
}