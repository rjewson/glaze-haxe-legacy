
package engine.action;

class Delay extends Action
{

    public var delay:Float;
    public var expired:Bool;

    public function new(delay:Float) {
        super();
        this.delay = delay;
        this.blocking = true;
    }

    override public function update(time:Float) {
        elapsed+=time;
        if (elapsed>delay) {
            //js.Lib.debug();
            blocking = false;
            finished = true;
        }
    }

}