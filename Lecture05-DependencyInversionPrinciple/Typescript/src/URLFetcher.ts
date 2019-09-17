import * as https from "https";

export class URLFetcher {

	constructor() {
		return;
	}
	
	public fetch(url: string): Promise<string> {
	
		return new Promise<string>((resolve, reject) => {
			
			let dataStr = '';
			
			https.get(url, (resp) => {
			
				resp.on('data', (chunk: string) => {
					dataStr += chunk;
				});
				
				resp.on('end', () => {
					resolve(dataStr);
				});

				resp.on('error', (error: Error) => {
					reject('Could not download document: ' + error.message);
				});
				
			}).on('error', (error: Error) => {
				reject('Could not download document: ' + error.message);
			});	
		});
	}

}
