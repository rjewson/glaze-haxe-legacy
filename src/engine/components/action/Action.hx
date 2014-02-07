
package engine.components.action;

import ds.DLL.DLLNode;
import engine.components.action.ActionList;

class Action implements DLLNode<Action>
{

    public var isBlocking:Bool;
    public var isFinished:Bool;

    public var elapsed:Float;
    public var duration:Float;

    public var ownerList:ActionList;

    public var prev:Action;
    public var next:Action;

    public function new() {
        this.isBlocking = false;
        this.duration = 0;
        this.elapsed = 0;
        this.isFinished = false;
    }

    public function onStart() {
    }

    public function onUpdate(dt :Float) {
        this.elapsed += dt;
    }

    public function onEnd() {

    }

}