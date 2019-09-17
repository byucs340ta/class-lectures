"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Flight {
    constructor(f) {
        this.icao24 = "";
        this.callsign = "";
        this.origin_country = "";
        this.time_position = 0;
        this.last_contact = 0;
        this.longitude = 0.0;
        this.latitude = 0.0;
        this.baro_altitude = 0.0;
        this.on_ground = false;
        this.velocity = 0.0;
        this.true_track = 0.0;
        this.vertical_rate = 0.0;
        this.sensors = [];
        this.geo_altitude = 0.0;
        this.squawk = "";
        this.spi = false;
        this.position_source = 0;
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
    clone() {
        return new Flight(this);
    }
    toString() {
        return `id: ${this.icao24}, call: ${this.callsign}, country: ${this.origin_country}, ` +
            `lon: ${this.longitude}, lat: ${this.latitude}, vel: ${this.velocity}, ` +
            `alt: ${this.geo_altitude}`;
    }
    equals(f) {
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
exports.Flight = Flight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxpZ2h0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0ZsaWdodC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLE1BQWEsTUFBTTtJQW9CbEIsWUFBWSxDQUFVO1FBbEJmLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1QixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixjQUFTLEdBQVcsR0FBRyxDQUFDO1FBQ3hCLGFBQVEsR0FBVyxHQUFHLENBQUM7UUFDdkIsa0JBQWEsR0FBVyxHQUFHLENBQUM7UUFDNUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixhQUFRLEdBQVcsR0FBRyxDQUFDO1FBQ3ZCLGVBQVUsR0FBVyxHQUFHLENBQUM7UUFDekIsa0JBQWEsR0FBVyxHQUFHLENBQUM7UUFDNUIsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUN2QixpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQUMzQixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLFFBQUcsR0FBWSxLQUFLLENBQUM7UUFDckIsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFHbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUM7WUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQztZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDN0IsSUFB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