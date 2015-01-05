
package engine.action;

import eco.core.Entity;
import engine.action.Action;
import engine.action.ActionList;

class ActionList extends Action
{

    public var actions:ds.DLL<Action>;

    public var owner:Entity;

    public function new() { 
        super();
        actions = new ds.DLL<Action>();
    }

    override public function update(time:Float) {
        var action = actions.head;
        while (action!=null) {
            if (!action.started) {
                action.onStart();
            }
            action.update(time);
            if (action.blocking)
                break;
            if (action.finished) {
                action.onEnd();
                actions.remove(action);
            }
            action = action.next;
        }
    }    

    public function insertAfter(action:Action,newAction:Action){
        action.list = this;
        actions.insertAfter(action,newAction);
    }

    public function insertBefter(action:Action,newAction:Action){
        action.list = this;
        actions.insertBefore(action,newAction);        
    }

    public function insertBegining(newAction:Action){
        newAction.list = this;
        actions.insertBeginning(newAction);        
    }

    public function insertEnd(newAction:Action){
        newAction.list = this;
        actions.insertEnd(newAction);        
    }

    public function remove(action:Action){
        action.list = null;
        actions.remove(action);        
    }

}