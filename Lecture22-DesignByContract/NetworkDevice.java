

interface NetworkDevice {

   IpAddress getIpAddress();
   
   MacAddress getMacAddress();
   
   String getDescription();

   boolean isUp();

   Port[] getPorts();
}


class Router implements NetworkDevice {
	...
}


class Switch implements NetworkDevice {
	...
}
