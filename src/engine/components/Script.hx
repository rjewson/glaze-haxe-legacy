
package engine.components;

import eco.core.Component;
import engine.action.ActionList;
import engine.ai.behaviors.BehaviorTree;
import engine.ai.behaviors.Sequence;

class Script extends Component
{

    public var actionList:ActionList;

    public var bt:engine.ai.behaviors.Behavior;

    public function new() {
        actionList = new ActionList();
        bt = new Sequence();
    }

    override public function onAdded() {
        actionList.owner = owner;
    }

    override public function update(time:Float) {
        actionList.update(time);
    }

}