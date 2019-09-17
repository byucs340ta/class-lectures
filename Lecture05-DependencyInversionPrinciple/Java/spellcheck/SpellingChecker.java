
package spellcheck;

import java.util.*;
import java.net.*;
import java.io.*;


public class SpellingChecker {

	public SortedMap<String, Integer> check(URL url) throws IOException {

		// download the document content
		//
		URLFetcher fetcher = new URLFetcher();
		String content = fetcher.fetch(url);

		// extract words from the content
		//
		WordExtractor extractor = new WordExtractor();
		List<String> words = extractor.extract(content);

		// find spelling mistakes
		//
		Dictionary dictionary = new Dictionary("dict.txt");
		SortedMap<String, Integer> mistakes = new TreeMap<String, Integer>();
		
		Iterator<String> it = words.iterator();
		while (it.hasNext()) {
			String word = it.next();
			if (!dictionary.isValidWord(word)) {
				if (mistakes.containsKey(word)) {
					int oldCount = mistakes.get(word);
					mistakes.put(word, (Integer)(oldCount + 1));
				}
				else {
					mistakes.put(word, (Integer)1);
				}
			}
		}

		return mistakes;
	}

}

