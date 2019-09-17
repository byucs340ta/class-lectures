import { SpellingChecker } from './SpellingChecker';


let url = process.argv[2];

let checker: SpellingChecker = new SpellingChecker();
checker.check(url)
	.then((mistakes: Object) => {
		console.log(JSON.stringify(mistakes));
	})
	.catch((error: string) => {
		console.error(error);
	});
