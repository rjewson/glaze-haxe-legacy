
package engine.core;

import engine.core.Component;
import ds.DLL;
import engine.core.EntityManager;

class Entity implements DLLNode<Entity>
{
    public var components:DLL<Component>;
    private var componentMap :Dynamic<Component>;

    public var prev:Entity;
    public var next:Entity;

    private var manager:EntityManager;

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
        if (manager!=null)
            manager.componentAdded.dispatch(component);
        return this;
    }

    public function remove(component:Component) {
        components.remove(component);
        component.onRemoved();
        untyped __js__("delete")(componentMap[component.name]);
        if (manager!=null)
            manager.componentRemoved.dispatch(component);
    }

    public function onAddedToManager(manager:EntityManager) {
        this.manager = manager;
        var component = components.head;
        while (component!=null) {
            manager.componentAdded.dispatch(component);
            component = component.next;
        }
    }

    public function onRemovedFromManager() {
        var component = components.head;
        while (component!=null) {
            manager.componentRemoved.dispatch(component);
            component = component.next;
        }
        this.manager = null;
    }

    inline public function getComponent(name:String):Component {
        return untyped componentMap[name];
    }

}