
package engine.core;

class Component
{
    public var owner (default, null) :Entity;

    public var next (default, null) :Component;

    public var name:String;

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

    public function init (owner :Entity, next :Component) {
        this.owner = owner;
        this.next = next;
    }

    inline public function setNext (next :Component) {
        this.next = next;
    }
}