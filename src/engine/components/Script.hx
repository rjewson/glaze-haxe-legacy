
package engine.components;

import eco.core.Component;
import engine.action.ActionList;
import engine.ai.behaviors.actions.Delay;
import engine.ai.behaviors.actions.GetLocalEntities;
import engine.ai.behaviors.Behavior;
import engine.ai.behaviors.BehaviorContext;
import engine.ai.behaviors.BehaviorTree;
import engine.ai.behaviors.Sequence;

class Script extends Component
{

    public var actionList:ActionList;

    public var bt:Sequence;
    public var bc:BehaviorContext;

    public function new() {
        actionList = new ActionList();
        bt = new Sequence();
    }

    override public function onAdded() {
        actionList.owner = owner;
        bc = new BehaviorContext(owner);
        bt.addChild(new Delay(1000));
        bt.addChild(new GetLocalEntities(1000));
    }

    override public function update(time:Float) {
        actionList.update(time);
        bc.time = time;
        bt.tick(bc);
    }

}