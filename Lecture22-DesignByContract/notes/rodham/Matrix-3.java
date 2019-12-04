
/**
 * Matrix stores a matrix of numbers, and provides a full range of common matrix operations.
 * 
 * DOMAIN
 *   Rows: Integer, the number of rows in the Matrix
 *   Columns: Integer, the number of columns in the Matrix
 *   Values: 2-D array of Double, the values in the matrix
 *
 * {@invariant getRows() > 0}
 * {@invariant getColumns() > 0}
 */
public class Matrix {

	/**
	 * Constructs a new matrix with the specified number of rows and columns
	 * 
	 * @param rows Number of rows in the new matrix
	 * @param columns Number of columns in the new matrix
	 * 
	 * {@pre rows > 0}
	 * {@pre columns > 0}
	 * 
	 * {@post getRows() == rows}
	 * {@post getColumns() == columns}
	 * {@post get(i, j) == 0.0 for 0 <= i < rows, 0 <= j < columns}
	 */
	public Matrix(int rows, int columns) {
		... 
	}

	/**
	 * Constructs a new matrix by copying the contents of an existing matrix
	 * 
	 * @param other Existing matrix used to initialize the new matrix
	 * 
	 * {@pre other != null}
	 * 
	 * {@post getRows() == other.getRows()}
	 * {@post getColumns() == other.getColumns()}
	 * {@post get(i, j) == other.get(i, j) for 0 <= i < getRows(), 0 <= j < getColumns()}
	 */
	public Matrix(Matrix other) {
		... 
	}
	
	/**
	 * Returns the number of rows in the matrix
	 * 
	 * {@pre none}
	 * 
	 * {@post retval == the number of rows in the matrix}
	 */
	public int getRows() {
		... 
	}
	
	/**
	 * Returns the number of columns in the matrix
	 * 
	 * {@pre none}
	 * 
	 * {@post retval == the number of columns in the matrix}
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
	 * 
	 * {@pre 0 <= row < getRows()}
	 * {@pre 0 <= column < getColumns()}
	 * 
	 * {@post get(row, column) == value}
	 */
	public void set(int row, int column, double value) {
		... 
	}
	
	/**
	 * Returns the value of a matrix element
	 * 
	 * @param row Row of the requested element
	 * @param column Column of the requested element
	 * 
	 * {@pre 0 <= row < getRows()}
	 * {@pre 0 <= column < getColumns()}
	 * 
	 * {@post retval == the requested element's value}
	 */
	public double get(int row, int column) {
		... 
	}
	
	/**
	 * Is this matrix the identity matrix?
	 * 
	 * {@pre none}
	 * 
	 * {@post retval == true if this is the identity matrix, and false otherwise}
	 */
	public boolean isIdentity() {
		... 
	}
	
	/**
	 * Sets this matrix to the identity matrix
	 * 
	 * {@pre getRows() == getColumns()}
	 * 
	 * {@post get(i, i) == 1.0 for 0 <= i < getRows()}
	 * {@post get(i, j) == 0.0 for i != j, 0 <= i, j < getRows()}
	 */
	public void makeIdentity() {
		... 
	}
	
	/**
	 * Adds the argument matrix to this matrix
	 * 
	 * @param other Matrix being added to this one
	 * 
	 * {@pre other != null}
	 * {@pre getRows() == other.getRows()}
	 * {@pre getColumns() == other.getColumns()}
	 * 
	 * {@post get(i, j) == old(get(i, j)) + other.get(i, j) for 0 <= i < getRows(), 0 <= j < getColumns()}
	 */
	public void add(Matrix other) {
		... 
	}
	
	/**
	 * Scales each element of this matrix by a constant factor
	 * 
	 * @param factor Scaling factor
	 * 
	 * {@pre none}
	 * 
	 * {@post get(i, j) == factor * old(get(i, j)) for 0 <= i < getRows(), 0 <= j < getColumns()}
	 */
	public void scale(double factor) {
		... 
	}
	
	/**
	 * Computes the product of this matrix and the argument matrix, and returns the result
	 * 
	 * @param other Matrix being multiplied with this one
	 * 
	 * {@pre other != null}
	 * {@pre getColumns() == other.getRows()}
	 * 
	 * {@post retval.getRows() == getRows()}
	 * {@post retval.getColumns() == other.getColumns()}
	 * {@post retval contains the product of this and other}
	 */
	public Matrix multiply(Matrix other) {
		... 
	}
	
	...	
	
}
