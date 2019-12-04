import java.util.*;
import java.lang.reflect.*;

class Location {
    private int _x;
    private int _y;

    public Location(int x, int y) {
        _x = x;
        _y = y;
    }

    public int getX() {
        return _x;
    }

    public void setX(int x) {
        _x = x;
    }

    public int getY() {
        return _y;
    }

    public void setY(int y) {
        _y = y;
    }

    @Override
    public String toString() {
        return String.format("(%d, %d)", _x, _y);
    }
}

class VideoGame {

    private static VideoGame _instance = new VideoGame();

    public static void move(int player, Location newLoc) {
        _instance._move(player, newLoc);
    }

    public static void jump(int player) {
        _instance._jump(player);
    }

    public static void raiseShield(int player) {
        _instance._raiseShield(player);
    }

    public static void swingSword(int player, int angle, int speed) {
        _instance._swingSword(player, angle, speed);
    }


    private VideoGame() {
        System.out.println("Initializing video game");
    }

    private void _move(int player, Location newLoc) {
        System.out.println(String.format("Player %d moved to %s", player, newLoc));
    }

    private void _jump(int player) {
        System.out.println(String.format("Player %d jumped", player));
    }

    private void _raiseShield(int player) {
        System.out.println(String.format("Player %d raised their sheild", player));
    }

    private void _swingSword(int player, int angle, int speed) {
        System.out.println(String.format(
                "Player %d swung their sword at angle %d with speed %d", player, angle, speed));
    }
}

// Command interface

interface Command {
    void execute();
}

// Specific command classes

class MoveCommand implements Command {
    private int _player;
    private Location _newLoc;

    public MoveCommand(int player, Location newLoc) {
        _player = player;
        _newLoc = newLoc;
    }

    @Override
    public void execute() {
        VideoGame.move(_player, _newLoc);
    }
}

class JumpCommand implements Command {
    private int _player;

    public JumpCommand(int player) {
        _player = player;
    }

    @Override
    public void execute() {
        VideoGame.jump(_player);
    }
}

class RaiseShieldCommand implements Command {
    private int _player;

    public RaiseShieldCommand(int player) {
        _player = player;
    }

    @Override
    public void execute() {
        VideoGame.raiseShield(_player);
    }
}

class SwingSwordCommand implements Command {
    private int _player;
    private int _angle;
    private int _speed;

    public SwingSwordCommand(int player, int angle, int speed) {
        _player = player;
        _angle = angle;
        _speed = speed;
    }

    @Override
    public void execute() {
        VideoGame.swingSword(_player, _angle, _speed);
    }
}

class SpecificCommandTester {

    public static void main(String[] args) {
        List<Command> commands = new ArrayList<Command>();
        commands.add(new MoveCommand(3, new Location(75, 12)));
        commands.add(new JumpCommand(3));
        commands.add(new RaiseShieldCommand(3));
        commands.add(new SwingSwordCommand(3, 45, 100));

        runCommands(commands);
    }

    private static void runCommands(List<Command> commands) {
        for (Command c : commands) {
            c.execute();
        }
    }
}

// Generic command class

class GenericCommand implements Command {
    private String _className;
    private String _methodName;
    private Class<?>[] _paramTypes;
    private Object[] _paramValues;

    public GenericCommand(String className, String methodName,
                          Class<?>[] paramTypes, Object[] paramValues) {
        _className = className;
        _methodName = methodName;
        _paramTypes = paramTypes;
        _paramValues = paramValues;
    }

    @Override
    public void execute() {
        try {
            Class<?> receiver = Class.forName(_className);
            Method method = receiver.getMethod(_methodName, _paramTypes);
            method.invoke(null, _paramValues);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class GenericCommandTester {

    public static void main(String[] args) {
        Command move = new GenericCommand("VideoGame", "move",
                new Class<?>[]{ int.class, Location.class },
                new Object[] { 3 , new Location(75, 12) });
        Command jump = new GenericCommand("VideoGame", "jump",
                new Class<?>[]{ int.class },
                new Object[] { 3 });
        Command raiseShield = new GenericCommand("VideoGame", "raiseShield",
                new Class<?>[]{ int.class },
                new Object[] { 3 });
        Command swingSword = new GenericCommand("VideoGame", "swingSword",
                new Class<?>[]{ int.class, int.class, int.class },
                new Object[] { 3 , 45, 100 });

        List<Command> commands = new ArrayList<Command>();
        commands.add(move);
        commands.add(jump);
        commands.add(raiseShield);
        commands.add(swingSword);

        runCommands(commands);
    }

    private static void runCommands(List<Command> commands) {
        for (Command c : commands) {
            c.execute();
        }
    }
}
