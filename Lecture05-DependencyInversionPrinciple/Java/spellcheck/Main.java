
package spellcheck;

import java.io.*;
import java.net.*;
import java.util.*;


public class Main {

	public static void main(String[] args) {
	
		try {
			URL url = new URL(args[0]);
			SpellingChecker checker = new SpellingChecker();
			SortedMap<String, Integer> mistakes = checker.check(url);
			System.out.println(mistakes);
		}
		catch (IOException e) {
			System.out.println(e);
		}
	}

}

