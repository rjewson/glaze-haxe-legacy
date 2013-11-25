
package engine.core;

import ds.DLL.DLLNode;

class Component implements DLLNode<Component>
{
    public var name:String;
    public var owner:Entity;

    public var prev:Component;
    public var next:Component;


    public function onAdded () {
    }

    public function onRemoved () {
    }

    public function onUpdate (dt :Float) {
    }

    public function dispose () {
        if (owner != null) {
            owner.remove(this);
        }
    }

}