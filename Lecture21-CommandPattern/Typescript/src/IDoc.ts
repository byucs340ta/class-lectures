export interface IDoc {
  /**
  * Inserts a character sequence into the document
  * @param pos Position at which the character sequence should be inserted
  * @param s Character sequence to be inserted
  */
  insert(pos: number, s: string): void;

  /**
   * Deletes a character sequence from the document
   * @param pos Starting position of the sequence that is being deleted
   * @param count Number of characters to be deleted
   * @return True if successful, false otherwise
   */
  delete(pos: number, count: number): boolean;

  /**
   * Displays the current contents of the document
   */
  display(): void;

  /**
   * Saves the document to an existing file
   * @param fileName Name of the file to which the document will be saved
   */
  save(fileName: string): void;

  /**
   * Opens a document from an existing file
   * @param fileName Name of the file to be opened
   */
  open(fileName: string): void;

  /**
   * Deletes the entire contents of the document and resets it to an empty state
   */
  clear(): void;
}