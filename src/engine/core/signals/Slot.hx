
package engine.core.signals;

import ds.DLL.DLLNode;

class Slot implements DLLNode<Slot>
{

    public var listener:Dynamic;
    public var once:Bool;
    public var priority:Int;
    public var enabled:Bool;

    public var prev:Slot;
    public var next:Slot;

    public function new(listener:Dynamic,once:Bool) {
        this.listener =  listener;
        this.once = once;
    }

}