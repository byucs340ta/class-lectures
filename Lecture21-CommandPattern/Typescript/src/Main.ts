import { ISequence } from './ISequence';
import { Sequence } from './Sequence';
import { IDoc } from './IDoc';
import { Doc } from './Doc';
import { TextEditor } from './TextEditor';

function main() {
  let sequence: ISequence = new Sequence();
  let doc: IDoc = new Doc(sequence);

  let textEditor = new TextEditor(doc);

  textEditor.run();
}

main();