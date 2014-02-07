
package engine.components.action;

import engine.components.action.Action;

class Delay extends Action
{

    public function new(duration:Float) {
        super();
        this.isBlocking = true;
        this.duration = duration;
    }

    override public function onUpdate(dt :Float) {
        this.elapsed += dt;
        if (elapsed>duration) {
            isFinished = true;
        }
    }

}