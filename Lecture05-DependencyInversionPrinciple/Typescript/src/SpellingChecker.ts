import { URLFetcher } from './URLFetcher';
import { WordExtractor } from './WordExtractor';
import { Dictionary } from './Dictionary';


export class SpellingChecker {

	public check(url: string): Promise<Object> {
	
		return new Promise<Object>((resolve, reject) => {
					
			// download the document content
			let fetcher: URLFetcher = new URLFetcher();
			fetcher.fetch(url)
				.then((content: string) => {
				
					// extract words from the content
					let extractor: WordExtractor = new WordExtractor();
					let words: string[] = extractor.extract(content);
					
					// find spelling mistakes
					let dictionary: Dictionary = new Dictionary();
					dictionary.load("dict.txt")
						.then((loadResult: boolean) => {
						
							let mistakes: Object = {};
							
							words.forEach((word: string) => {
								if (!dictionary.isValidWord(word)) {
									if (mistakes[word] !== undefined) {
										mistakes[word] = mistakes[word] + 1;
									}
									else {
										mistakes[word] = 1;
									}
								}
							});
							
							let sortedMistakes: Object = {};
							Object.keys(mistakes).sort().forEach((key: string) => {
								sortedMistakes[key] = mistakes[key];
							});
							
							resolve(sortedMistakes);
						})
						.catch((error: string) => {
							reject(error);
						});		
				})
				.catch((error: string) => {
					reject(error);
				});			
		});
	}
	
}
