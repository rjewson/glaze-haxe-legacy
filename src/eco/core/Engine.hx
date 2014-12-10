
package eco.core;

import eco.core.ClassMap;
import eco.core.Component;
import eco.core.Entity;
import eco.signals.Signal2;
import haxe.ds.HashMap;

class Engine 
{

    public var entities:Array<Entity>;

    public var systems:Array<System>;

    public var componentSystemMap:ClassMap;

    public var componentAdded(default, null):Signal2<Entity, Class<Component>>;
    public var componentRemoved(default, null):Signal2<Entity, Class<Component>>;

    public var componentPriorities:Map<String,Int>;

    public var updating:Bool;

    public function new() {

        entities = new Array<Entity>();
        systems = new Array<System>();

        componentSystemMap = new ClassMap();

        componentAdded = new Signal2<Entity, Class<Component>>();
        componentRemoved = new Signal2<Entity, Class<Component>>();

        componentAdded.add(componentSystemMap.componentAdded);
        componentRemoved.add(componentSystemMap.componentRemoved);

        updating = false;

        componentPriorities = new Map<String,Int>();

    }

    public function addEntity(entity:Entity) {
        entities.push(entity);
        entity.onAdded(this);
    }

    public function removeEntity(entity:Entity) {
        var i = entities.indexOf(entity);
        if (i>=0) {
            entities.splice(i,1);
            entity.onRemoved();
        }
    }

    public function addSystem(system:System) {
        systems.push(system);
        componentSystemMap.registerSystem(system);
        system.onAdded(this);
    }

    public function removeSystem(system:System) {
        var i = systems.indexOf(system);
        if (i>=0) {
            systems.splice(i,1);
            system.onRemoved();
        }
    }

    public function registerComponent(component:Class<Component>,priority:Int) {
        var registeredName = Type.getClassName(component).split(".").pop();
        componentPriorities.set(registeredName,priority);
    }

    public function setComponentPriority(component:Component) {
        component.priority = componentPriorities.exists(component.name) ? componentPriorities.get(component.name) : 0;
    }

    public function update(time:Float) {
        updating = true;
        
        for (system in systems)
            system.update(time);

        updating = false;
        // updateComplete.dispatch();
    }

}