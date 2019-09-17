import fs from 'fs';

export class Dictionary {

	private words: Object;
	
	constructor() {
		return;
	}
	
	public load(fileName: string): Promise<boolean> {
	
		return new Promise<boolean>((resolve, reject) => {
			this.words = {};

			fs.readFile(fileName, 'utf8', (err, data) => {
			
				if (err) {
					reject('Could not load dictionary: ' + err);
				}
				else {
					let dictStr: string = data.toString();
					if (dictStr) {
						dictStr.split(/\s+/).forEach((word: string) => {
							this.words[word] = true;
						});
						
						resolve(true);
					}
					else {
						reject('Dictionary was empty');
					}
				}
			});
		});
	}
	
	public isValidWord(word: string): boolean {
	
		return !!this.words[word];
	}
	
}
