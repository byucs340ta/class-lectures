
package spellcheck;

import java.net.*;
import java.io.*;


public class URLFetcher {

	public String fetch(URL url) throws IOException {

		URLConnection connection = url.openConnection();
		
		StringBuffer contentBuffer = new StringBuffer();
		
		InputStream input = connection.getInputStream();
		
		try {
			int c;
			while ((c = input.read()) >= 0) {
				contentBuffer.append((char)c);
			}
		}
		finally {
			input.close();
		}
	
		return contentBuffer.toString();
	}

}

