
package eco.core;

import eco.core.System;

class ClassMap 
{
    // Component String Name > [System,System]
    private var map:Map<String,Array<System>>;

    public function new() {
        map = new Map<String,Array<System>>();
    }

    public function registerSystem(system:System) {
        for (componentClass in system.registeredComponents) {
            var className = Type.getClassName(componentClass);
            if (!map.exists(className)) {
                map.set(className,new Array<System>());
            }
            map.get(className).push(system);
        }
    }

    public function componentAdded(e:Entity,c:Class<Component>) {
        var className = Type.getClassName(c);
        var systems = map.get(className);
        if (systems!=null) {
            for (system in systems) 
                system.componentAdded(e,c);
        }

    }

    public function componentRemoved(e:Entity,c:Class<Component>) {
        var className = Type.getClassName(c);
        var systems = map.get(className);
        if (systems!=null) {
            for (system in systems) 
                system.componentRemoved(e,c);
        }
    }

}