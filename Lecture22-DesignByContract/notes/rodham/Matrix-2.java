
/**
 * Matrix stores a matrix of numbers, and provides a full range of common matrix operations.
 */
public class Matrix {

	/**
	 * Constructs a new matrix with the specified number of rows and columns
	 * 
	 * @param rows Number of rows in the new matrix
	 * @param columns Number of columns in the new matrix
	 */
	public Matrix(int rows, int columns) {
		... 
	}

	/**
	 * Constructs a new matrix by copying the contents of an existing matrix
	 * 
	 * @param other Existing matrix used to initialize the new matrix
	 */
	public Matrix(Matrix other) {
		... 
	}
	
	/**
	 * Returns the number of rows in the matrix
	 */
	public int getRows() {
		... 
	}
	
	/**
	 * Returns the number of columns in the matrix
	 */
	public int getColumns() {
		... 
	}

	/**
	 * Sets a matrix element to a specified value
	 * 
	 * @param row Row of the element being set
	 * @param column Column of the element being set
	 * @param value New element value
	 */
	public void set(int row, int column, double value) {
		... 
	}
	
	/**
	 * Returns the value of a matrix element
	 * 
	 * @param row Row of the requested element
	 * @param column Column of the requested element
	 */
	public double get(int row, int column) {
		... 
	}
	
	/**
	 * Is this matrix the identity matrix?
	 */
	public boolean isIdentity() {
		... 
	}
	
	/**
	 * Sets this matrix to the identity matrix
	 */
	public void makeIdentity() {
		... 
	}
	
	/**
	 * Adds the argument matrix to this matrix
	 * 
	 * @param other Matrix being added to this one
	 */
	public void add(Matrix other) {
		... 
	}
	
	/**
	 * Scales each element of this matrix by a constant factor
	 * 
	 * @param factor Scaling factor
	 */
	public void scale(double factor) {
		... 
	}
	
	/**
	 * Computes the product of this matrix and the argument matrix, and returns the result
	 * 
	 * @param other Matrix being multiplied with this one
	 */
	public Matrix multiply(Matrix other) {
		... 
	}
	
}
