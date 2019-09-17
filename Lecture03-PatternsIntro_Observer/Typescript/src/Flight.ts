
export class Flight {
	
	public icao24: string = "";
	public callsign: string = "";
	public origin_country: string = "";
	public time_position: number = 0;
	public last_contact: number = 0;
	public longitude: number = 0.0;
	public latitude: number = 0.0;
	public baro_altitude: number = 0.0;
	public on_ground: boolean = false;
	public velocity: number = 0.0;
	public true_track: number = 0.0;
	public vertical_rate: number = 0.0;
	public sensors: number[] = [];
	public geo_altitude: number = 0.0;
	public squawk: string = "";
	public spi: boolean = false;
	public position_source: number = 0;
	
	constructor(f?: Flight) {
		if (!!f) {
			this.icao24 = f.icao24;
			this.callsign = f.callsign;
			this.origin_country = f.origin_country;
			this.time_position = f.time_position;
			this.last_contact = f.last_contact;
			this.longitude = f.longitude;
			this.latitude = f.latitude;
			this.baro_altitude = f.baro_altitude;
			this.on_ground = f.on_ground;
			this.velocity = f.velocity;
			this.true_track = f.true_track;
			this.vertical_rate = f.vertical_rate;
			this.sensors = [...f.sensors];
			this.geo_altitude = f.geo_altitude;
			this.squawk = f.squawk;
			this.spi = f.spi;
			this.position_source = f.position_source;
		}
	}
	
	public clone(): Flight {
		return new Flight(this);
	}
	
	public toString(): string {
		return `id: ${this.icao24}, call: ${this.callsign}, country: ${this.origin_country}, ` +
				`lon: ${this.longitude}, lat: ${this.latitude}, vel: ${this.velocity}, ` +
				`alt: ${this.geo_altitude}`;
	}
	
	public equals(f: Flight): boolean {
		if (!f) {
			return false;
		}
		if (f === this) {
			return true;
		}

		return (this.icao24 === f.icao24 &&
				this.callsign === f.callsign &&
				this.origin_country === f.origin_country &&
				this.time_position === f.time_position &&
				this.last_contact === f.last_contact &&
				this.longitude === f.longitude &&
				this.latitude === f.latitude &&
				this.baro_altitude === f.baro_altitude &&
				this.on_ground === f.on_ground &&
				this.velocity === f.velocity &&
				this.true_track === f.true_track &&
				this.vertical_rate === f.vertical_rate &&
				JSON.stringify(this.sensors) === JSON.stringify(f.sensors) &&
				this.geo_altitude === f.geo_altitude &&
				this.squawk === f.squawk &&
				this.spi === f.spi &&
				this.position_source === f.position_source);
	}
	
}