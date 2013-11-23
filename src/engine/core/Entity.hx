
package engine.core;

// using Lambda;

class Entity
{
    /** This entity's next sibling, for iteration. */
    public var next:Entity;

    /** This entity's first component. */
    public var firstComponent (default, null) :Component = null;

    private var _compMap :Dynamic<Component>;

    public function new ()
    {
        _compMap = {};
    }

    /**
     * Add a component to this entity. Any previous component of this type will be replaced.
     * @returns This instance, for chaining.
     */
    public function add (component :Component):Entity {
        // Remove the component from any previous owner. Don't just call dispose, which has
        // additional behavior in some components (like Disposer).
        if (component.owner != null) {
            component.owner.remove(component);
        }

        var name = component.name;
        var prev = getComponent(name);
        if (prev != null) {
            // Remove the previous component under this name
            remove(prev);
        }

        untyped _compMap[name] = component;

        // Append it to the component list
        var tail = null, p = firstComponent;
        while (p != null) {
            tail = p;
            p = p.next;
        }
        if (tail != null) {
            tail.setNext(component);
        } else {
            firstComponent = component;
        }

        component.init(this, null);
        component.onAdded();

        return this;
    }

    public function remove (component :Component):Bool {
        var prev :Component = null, p = firstComponent;
        while (p != null) {
            var next = p.next;
            if (p == component) {
                // Splice out the component
                if (prev == null) {
                    firstComponent = next;
                } else {
                    prev.init(this, next);
                }

                // Remove it from the _compMap
                untyped __js__("delete")(_compMap[p.name]);

                // Notify the component it was removed
                p.onRemoved();
                p.init(null, null);
                return true;
            }
            prev = p;
            p = next;
        }
        return false;
    }

    inline public function getComponent (name :String):Component
    {
        return untyped _compMap[name];
    }

}