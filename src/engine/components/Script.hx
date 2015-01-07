
package engine.components;

import eco.core.Component;
import engine.ai.behaviors.Behavior;
import engine.ai.behaviors.BehaviorContext;
import engine.ai.behaviors.BehaviorTree;
import engine.ai.behaviors.Sequence;

class Script extends Component
{
    public var bt:Sequence;
    public var bc:BehaviorContext;

    public function new() {
        bt = new Sequence();
    }

    override public function onAdded() {
        bc = new BehaviorContext(owner);
    }

    override public function update(time:Float) {
        bc.time = time;
        bt.tick(bc);
    }

}