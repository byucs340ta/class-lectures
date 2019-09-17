
import * as https from "https";
import { Flight } from './Flight';
import { FlightStates } from './FlightStates';


export class FlightFeed {
	
	private readonly OPEN_SKY_BASE_URL = "https://opensky-network.org/api/states/all";
	
	// Flight property
	private _flight: Flight = null;	
	public get flight(): Flight {
		return this._flight;
	}
	public set flight(value: Flight) {
		this._flight = value;
	}
	
	public start(): void {
		
		this.getAllFlights((allFlights: FlightStates, error: string) => {
			if (!!allFlights) {
			
				// Monitor the first flight returned by Open Sky
				this.flight = allFlights.states[0];
				console.log(this.flight.toString());
		
				this.poll();
			}
			else {
				console.log(error);
			}
		});		
	}
	
	private poll(): void {
		
		const UPDATE_DELAY_MILLIS = 60 * 1000;

		setTimeout(() => {
		
			// Get latest flight info
			this.getSingleFlight(this.flight, (newFlight: Flight, error: string) => {		
				if (!!newFlight) {				
				
					if (!this.flight.equals(newFlight)) {
						
						// Flight info changed
						this.flight = newFlight;
						console.log(this.flight.toString());
					}
				}
				else if (!!error) {
					console.log(error);
				}
				else {
					// Flight disappeared from the data feed			
					this.flight = null;
					console.log("Flight Over");
					
					return;
				}
			
				this.poll();
			});
			
		}, UPDATE_DELAY_MILLIS);
	}

	private getAllFlights(callback: (flights: FlightStates, error: string) => void): void {
		
		let url: string = this.OPEN_SKY_BASE_URL;
		
		this.callOpenSky(url, (flights: FlightStates, error: string) => {	
			if (!!flights) {
				callback(flights, null);
			}
			else {
				callback(null, error);
			}
		});
	}
	
	private getSingleFlight(flight: Flight, callback: (flight: Flight, error: string) => void): void {
		
		let url: string = this.OPEN_SKY_BASE_URL + "?icao24=" + flight.icao24;
		
		this.callOpenSky(url, (flights: FlightStates, error: string) => {		
			if (!!flights) {
				callback(flights.states[0], null);
			}
			else {
				callback(null, error);
			}
		});
	}
	
	private callOpenSky(url: string, callback: (flights: FlightStates, error: string) => void): void {
		
		let dataStr = '';
		
		https.get(url, (resp) => {
		
			resp.on('data', (chunk: string) => {
				dataStr += chunk;
			});
			
			resp.on('end', () => {
				//console.log(dataStr);
				let data: Object = JSON.parse(dataStr);
				let flights: FlightStates = this.parseFlights(data);
				callback(flights, null);
			});

			resp.on('error', (error: Error) => {
				callback(null, error.message);
			});
			
		}).on('error', (error: Error) => {
			callback(null, error.message);
		});
	}
	
	private parseFlights(data: any): FlightStates {
			
		let flights = new FlightStates();
			
		flights.time = data.time;
		
		if (!!data.states && data.states.length > 0) {
			data.states.forEach((value: []) => {
				let flight = this.parseFlight(value);
				flights.states.push(flight);
			}, this);
		}
		
		return flights;
	}
	
	private parseFlight(arr: any[]): Flight {
	
		let flight = new Flight();
		
		flight.icao24 = arr[0];
		flight.callsign = arr[1];
		flight.origin_country = arr[2];
		flight.time_position = arr[3];
		flight.last_contact = arr[4];
		flight.longitude = arr[5];
		flight.latitude = arr[6];
		flight.baro_altitude = arr[7];
		flight.on_ground = arr[8];
		flight.velocity = arr[9];
		flight.true_track = arr[10];
		flight.vertical_rate = arr[11];
		flight.sensors = arr[12];
		flight.geo_altitude = arr[13];
		flight.squawk = arr[14];
		flight.spi = arr[15];
		flight.position_source = arr[16];

		return flight;
	}
		
}