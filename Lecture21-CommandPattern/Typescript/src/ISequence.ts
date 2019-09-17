export interface ISequence {
  /**
   * Prints the sequence
   */
  print(): void;

  /**
   * Inserts a string into the sequence
   * @param pos Position in the sequence to insert the string
   * @param s String to be inserted
   */
  insert(pos: number, s: string): void;

  /**
   * Deletes a character sequence from the sequence
   * @param pos Starting position of the sequence that is being deleted
   * @param count Number of characters to be deleted
   */
  delete(pos: number, count: number): void;

  /**
   * Clears the sequence to a clean, empty state
   */
  clear(): void;

  /**
   * Returns the string representation of the sequence
   */
  toString(): string;
}