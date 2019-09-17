import { IDoc } from './IDoc';

export class TextEditor {
  doc: IDoc;

  constructor(doc: IDoc) {
    this.doc = doc;
  }

  private rl = require('readline-sync');

  run() {
    while (true) {
      this.printOptions();
      this.selectOption();
    }
  }

  private printOptions(): void {
    console.log('\nSELECT AN OPTION (1 - 10):\n');
    console.log('1. Insert a string at a specified index in the document\n');
    console.log('2. Delete a sequence of characters at a specified index\n');
    console.log('3. Replace a sequence of characters at a specified index with a new string\n');
    console.log('4. Display the current contents of the document\n');
    console.log('5. Save the document to a file\n');
    console.log('6. Open a document from a file\n');
    console.log('7. Start a new, empty document\n');
    console.log('8. Undo\n');
    console.log('9. Redo\n');
    console.log('10. Quit\n\n');
  }

  private selectOption() {
    let sel = this.rl.question('Your selection: ');
    switch (sel) {
      case '1':
        this.insert();
        break;
      case '2':
        this.delete();
        break;
      case '3':
        this.replace();
        break;
      case '4':
        this.doc.display();
        break;
      case '5':
        this.save();
        break;
      case '6':
        this.open();
        break;
      case '7':
        this.doc.clear();
        break;
      case '8':
        console.log('Undo');
        break;
      case '9':
        console.log('Redo');
        break;
      default:
        process.exit(0);
    };
  }

  private insert() {
    let pos: number | undefined = +this.rl.question('Start index: ');
    let s = this.rl.question('Sequence to insert: ');

    if (pos != undefined && s) {
      this.doc.insert(pos, s);
    }
  }

  private delete(): void {
    let pos: number | undefined = +this.rl.question('Start index: ');
    let count: number | undefined = +this.rl.question('Number of characters to delete: ');

    if (pos != undefined && count) {
      this.doc.delete(pos, count);
    }
  }

  private replace(): void {
    let pos: number | undefined = +this.rl.question('Start index: ');
    let count: number | undefined = +this.rl.question('Number of characters to delete: ');
    let s = this.rl.question('Sequence to insert: ');

    if (pos != undefined && count != undefined && s) {
      this.doc.delete(pos, count);
      this.doc.insert(pos, s);
    }
  }

  private save(): void {
    let fileName = this.rl.question('Name of file: ');

    if (fileName) {
      this.doc.save(fileName);
    }
  }

  private open(): void {
    let fileName = this.rl.question('Name of file: ');

    if (fileName) {
      this.doc.open(fileName);
    }
  }
}