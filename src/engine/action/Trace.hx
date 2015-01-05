
package engine.action;

import engine.action.Delay;

class Trace extends Action
{

    public function new() {
        super();
    }

    override public function update(time:Float) {
        //trace("Hi there");
        // js.Lib.debug();
        insertInFrontOfMe(new Delay(2000));
    }

}