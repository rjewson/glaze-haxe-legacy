
package engine.ai.behaviors.actions;

import engine.ai.behaviors.Behavior;
import engine.ai.behaviors.BehaviorContext;

class Delay extends Behavior
{

    private var delay:Float;
    private var elapsed:Float;

    public function new(delay:Float) {
        super();
        this.delay = delay;
    }

    override private function initialize(context:BehaviorContext):Void {
        trace("initalize");
        elapsed = 0;
    }

    override private function terminate(status:BehaviorStatus):Void { 
        trace("terminate:"+status);
    }

    override private function update(context:BehaviorContext):BehaviorStatus { 
        elapsed+=context.time;
        if (elapsed>delay) {
            return Success;
        }
        return Running;
    }

}