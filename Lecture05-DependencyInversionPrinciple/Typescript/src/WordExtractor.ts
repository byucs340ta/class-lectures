
export class WordExtractor {

	constructor() {
		return;
	}
	
	public extract(content: string): string[] {
	
		content = content.toLowerCase();
		
		return content.split(/[^A-Za-z]+/);
	}

}
