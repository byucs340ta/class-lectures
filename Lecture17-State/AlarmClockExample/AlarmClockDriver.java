











import java.util.*;


class ACTime {

	private int hour;
	private int minute;
	
	public ACTime(int hour, int minute) {
		this.hour = hour;	
		this.minute = minute;
	}

	public int getHour() { 
		return hour; 
	}
	
	public int getMinute() { 
		return minute;
	}

	public ACTime adjust(int delta) {
		int adjustedHour = hour;
		int adjustedMinute = minute + delta;
		while (adjustedMinute >= 60) {
			adjustedMinute -= 60;
			++adjustedHour;
			if (adjustedHour == 24) {
				adjustedHour = 0;
			}
		}
		return new ACTime(adjustedHour, adjustedMinute);
	}

	public boolean equals(Object o) {
		if (o != null && o instanceof ACTime) {
			ACTime other = (ACTime)o;
			return (hour == other.hour && 
					minute == other.minute);
		}
		return false;
	}

	public String toString() {
		return hour + ":" + minute;
	}

}


class ACState
{
	// called when the state is entered
	public void enter(AlarmClock clock) { }

	// called when the state is exited
	public void exit(AlarmClock clock) { }

	// called when the "current time" changes (i.e., once per minute)
	public void setTime(AlarmClock clock) { }

	// called when the user changes the alarm time
	public void setAlarmTime(AlarmClock clock) { }

	// called when the user presses the "alarm on" button
	public void turnAlarmOn(AlarmClock clock) { }

	// called when the user presses the "alarm off" button
	public void turnAlarmOff(AlarmClock clock) { }

	// called when the user presses the "snooze" button
	public void snooze(AlarmClock clock) { }
}


class AlarmClock {

	private ACTime time;
	private ACTime alarmTime;
	
	private ACState currentState;

	public AlarmClock() {
		time = new ACTime(0, 0);
		alarmTime = new ACTime(0, 0);
		setState(AlarmOffState.getInstance());
	}

	public ACTime getTime() {
		return time;
	}

	public ACTime getAlarmTime() {
		return alarmTime;
	}

	public void setTime(ACTime newTime) {
		time = newTime;
		currentState.setTime(this);
	}

	public void setAlarmTime(ACTime newAlarmTime) {
		alarmTime = newAlarmTime;
		currentState.setAlarmTime(this);
	}

	public void turnAlarmOn() {
		currentState.turnAlarmOn(this);
	}

	public void turnAlarmOff() {
		currentState.turnAlarmOff(this);
	}

	public void snooze() {
		currentState.snooze(this);
	}

	void setState(ACState newState) {

		if (currentState != null) {
			currentState.exit(this);
		}
		
		currentState = newState;
		
		if (currentState != null) {
			System.out.println(currentState.getClass().getName() + 
					" [" + time + "]");
			currentState.enter(this);
		}
	}
	
}


class AlarmOffState extends ACState {

	private static AlarmOffState instance = new AlarmOffState();
	public static AlarmOffState getInstance() { return instance; }
	private AlarmOffState() {}

	public void turnAlarmOn(AlarmClock clock) {
		clock.setState(AlarmOnState.getInstance());
	}

}


class AlarmOnState extends ACState {

	private static AlarmOnState instance = new AlarmOnState();
	public static AlarmOnState getInstance() { return instance; }
	private AlarmOnState() {}

	public void setTime(AlarmClock clock) {
		ACTime currentTime = clock.getTime();
		ACTime alarmTime = clock.getAlarmTime();
		if (currentTime.equals(alarmTime)) {
			clock.setState(BuzzingState.getInstance());
		}
	}

	public void turnAlarmOff(AlarmClock clock) {
		clock.setState(AlarmOffState.getInstance());
	}

}


class BuzzingState extends ACState {

	private static BuzzingState instance = new BuzzingState();
	public static BuzzingState getInstance() { return instance; }
	private BuzzingState() {}

	public void turnAlarmOff(AlarmClock clock) {
		clock.setState(AlarmOffState.getInstance());
	}

	public void snooze(AlarmClock clock) {
		clock.setState(SnoozingState.getInstance());
	}
	
}


class SnoozingState extends ACState {

	private static SnoozingState instance = new SnoozingState();
	public static SnoozingState getInstance() { return instance; }
	private SnoozingState() {}

	private ACTime activateTime;

	public void enter(AlarmClock clock) {
		activateTime = clock.getTime().adjust(9);
	}
	
	public void exit(AlarmClock clock) {
		activateTime = null;
	}

	public void setTime(AlarmClock clock) {
		ACTime currentTime = clock.getTime();
		if (currentTime.equals(activateTime)) {
			clock.setState(BuzzingState.getInstance());
		}
	}

	public void turnAlarmOff(AlarmClock clock) {
		clock.setState(AlarmOffState.getInstance());
	}

}


public class AlarmClockDriver {
	
	public static void main(String[] args) {	
		AlarmClock clock = new AlarmClock();
		clock.setTime(new ACTime(7, 55));
		clock.setAlarmTime(new ACTime(8, 0));

		wait(clock, 2);
		clock.turnAlarmOn();
		wait(clock, 10);
		clock.snooze();
		wait(clock, 20);
		clock.turnAlarmOff();
	}

	private static void wait(AlarmClock clock, int minutes) {
		for (int i=0; i < minutes; ++i) {
			clock.setTime(clock.getTime().adjust(1));
		}
	}

}
