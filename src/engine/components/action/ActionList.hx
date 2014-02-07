
package engine.components.action;

import engine.components.action.Action;
import ds.DLL;
import engine.components.action.ActionList;
import engine.core.Component;

class ActionList extends Component
{

    public var actions:DLL<Action>;

    public function new() {
        actions = new DLL<Action>();
    }

    public function AddToFront(action:Action):ActionList {
        preAddAction(action);
        actions.insertBeginning(action);
        return this;
    }

    public function AddToEnd(action:Action):ActionList {
        preAddAction(action);
        actions.insertEnd(action);
        return this;
    }

    public function AddBefore(nextAction:Action,action:Action):ActionList {
        preAddAction(action);
        actions.insertBefore(nextAction,action);
        return this;
    }

    public function AddAfter(previousAction:Action,action:Action):ActionList {
        preAddAction(action);
        actions.insertAfter(previousAction,action);
        return this;
    }

    override public function onUpdate(dt:Float) {
        var action = actions.head;
        while (action!=null) {
            action.onUpdate(dt);
            if (action.isFinished) {
                action = actions.remove(action);
            } else if (action.isBlocking) {
                break;
            } else {
                action = action.next;
            }
        }
    }

    public function RemoveAction(action:Action) {
        actions.remove(action);
    }

    private function preAddAction(action:Action) {
        if (action.ownerList!=null) {
            action.ownerList.RemoveAction(action);
        }
        action.ownerList = this;        
    }

}