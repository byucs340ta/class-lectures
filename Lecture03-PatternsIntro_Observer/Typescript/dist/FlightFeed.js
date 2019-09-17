"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const https = __importStar(require("https"));
const Flight_1 = require("./Flight");
const FlightStates_1 = require("./FlightStates");
class FlightFeed {
    constructor() {
        this.OPEN_SKY_BASE_URL = "https://opensky-network.org/api/states/all";
        // Flight property
        this._flight = null;
    }
    get flight() {
        return this._flight;
    }
    set flight(value) {
        this._flight = value;
    }
    start() {
        this.getAllFlights((allFlights, error) => {
            if (!!allFlights) {
                // Monitor the first flight returned by Open Sky
                this.flight = allFlights.states[0];
                console.log(this._flight.toString());
                this.poll();
            }
        });
    }
    poll() {
        const MILLIS_PER_MINUTE = 60 * 10;
        setTimeout(() => {
            // Get latest flight info
            this.getSingleFlight(this._flight, (newFlight, error) => {
                if (!!newFlight) {
                    if (!this._flight.equals(newFlight)) {
                        // Flight info changed
                        this.flight = newFlight;
                        console.log(this._flight.toString());
                    }
                }
                else {
                    // Flight disappeared from the data feed			
                    this.flight = null;
                    console.log("Flight Over");
                    return;
                }
            });
            this.poll();
        }, MILLIS_PER_MINUTE);
    }
    //private latitude: number;
    //private getAllFlights(): FlightStates {
    //	this.callOpenSky(this.OPEN_SKY_BASE_URL, (data: string, error: Error) => {
    //		if (!!data) {
    //			console.log(data);
    //		}
    //		else if (!!error) {
    //			console.log(error);
    //		}
    //		else {
    //			console.log("unknown error");
    //		}
    //	});
    //	this.latitude = 1000;
    //	let flight = new Flight();
    //	flight.latitude = this.latitude;
    //	let result = new FlightStates();
    //	result.states.push(flight);
    //	return result;
    //}
    //private count: number = 10;
    //private getSingleFlight(flight: Flight): Flight {
    //	--this.count;
    //	if (this.count >= 0) {
    //		let flight = new Flight();
    //		if (this.count % 2 === 0) {
    //			this.latitude = 1000 + this.count;
    //		}
    //		flight.latitude = this.latitude
    //		return flight;
    //	}
    //	else {
    //		return null;
    //	}
    //}
    getAllFlights(callback) {
        let url = this.OPEN_SKY_BASE_URL;
        this.callOpenSky(url, (flights, error) => {
            if (!!flights) {
                callback(flights, null);
            }
            else {
                callback(null, error);
            }
        });
    }
    getSingleFlight(flight, callback) {
        let url = this.OPEN_SKY_BASE_URL + "?icao24=" + flight.icao24;
        this.callOpenSky(url, (flights, error) => {
            if (!!flights) {
                callback(flights.states[0], null);
            }
            else {
                callback(null, error);
            }
        });
    }
    callOpenSky(url, callback) {
        let dataStr = '';
        https.get(url, (resp) => {
            resp.on('data', (chunk) => {
                dataStr += chunk;
            });
            resp.on('end', () => {
                //console.log(dataStr);
                let data = JSON.parse(dataStr);
                let flights = this.parseFlights(data);
                callback(flights, null);
            });
            resp.on('error', (error) => {
                callback(null, error.message);
            });
        }).on('error', (error) => {
            callback(null, error.message);
        });
    }
    parseFlights(data) {
        let flights = new FlightStates_1.FlightStates();
        flights.time = data.time;
        data.states.forEach((value) => {
            let flight = this.parseFlight(value);
            flights.states.push(flight);
        }, this);
        return flights;
    }
    parseFlight(arr) {
        let flight = new Flight_1.Flight();
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
exports.FlightFeed = FlightFeed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxpZ2h0RmVlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9GbGlnaHRGZWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLDZDQUErQjtBQUMvQixxQ0FBa0M7QUFDbEMsaURBQThDO0FBRzlDLE1BQWEsVUFBVTtJQUF2QjtRQUVrQixzQkFBaUIsR0FBRyw0Q0FBNEMsQ0FBQztRQUVsRixrQkFBa0I7UUFDVixZQUFPLEdBQVcsSUFBSSxDQUFDO0lBaU1oQyxDQUFDO0lBaE1BLElBQVcsTUFBTTtRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDckIsQ0FBQztJQUNELElBQVcsTUFBTSxDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVNLEtBQUs7UUFFWCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBd0IsRUFBRSxLQUFhLEVBQUUsRUFBRTtZQUM5RCxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUU7Z0JBRWpCLGdEQUFnRDtnQkFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFFckMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ1o7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTyxJQUFJO1FBRVgsTUFBTSxpQkFBaUIsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRWxDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFFZix5QkFBeUI7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBaUIsRUFBRSxLQUFhLEVBQUUsRUFBRTtnQkFDdkUsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFO29CQUVo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