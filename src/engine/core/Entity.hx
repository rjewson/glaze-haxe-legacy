
package engine.core;

import engine.core.Component;
import ds.DLL;

class Entity implements DLLNode<Entity>
{
    public var components:DLL<Component>;
    private var componentMap :Dynamic<Component>;

    public var prev:Entity;
    public var next:Entity;

    public function new()
    {
        components = new DLL<Component>();
        componentMap = {};
    }

    public function add(component:Component):Entity {
        if (component.owner != null) {
            component.owner.remove(component);
        }

        var name = component.name;
        var prev = getComponent(name);
        if (prev != null) {
            remove(prev);
        }
        component.owner = this;
        untyped componentMap[name] = component;
        components.insertEnd(component);
        component.onAdded();

        return this;
    }

    public function remove(component:Component) {
        components.remove(component);
        component.onRemoved();
    }

    inline public function getComponent(name:String):Component {
        return untyped componentMap[name];
    }

}