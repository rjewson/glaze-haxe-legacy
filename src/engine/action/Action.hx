
package engine.action;

import eco.core.Entity;
import engine.action.ActionList;
import ds.DLL.DLLNode;

class Action implements DLLNode<Action>
{

    public var prev:Action;
    public var next:Action;

    public var blocking:Bool = false;
    public var started:Bool = false;
    public var finished:Bool = false;

    public var elapsed:Float = 0;
    public var duration:Float = 0;

    public var lanes:Int = 0;

    public var list:ActionList;

    public function new() {
    }

    public function update(time:Float) {
        elapsed+=time;
    }

    public function onStart() {
        started = true;
    }

    public function onEnd() {
    }

    public function onAdded() {
    }

    public function insertInFrontOfMe(action:Action) {
        if (list==null)
            return;
        list.insertBefter(this,action);
    }

    public function getRootOwner():Entity {
        var _list:ActionList = list;
        while (true) {
            if (_list.list==null)
                break;
            _list = _list.list;
        }
        return _list.owner;
    }

}