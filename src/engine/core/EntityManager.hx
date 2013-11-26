
package engine.core;

import engine.core.Component;
import engine.core.Entity;
import engine.core.System;
import ds.DLL;
import engine.core.signals.Signal;
import engine.core.signals.Signal1;

class EntityManager 
{

    public var entities:DLL<Entity>;
    
    public var entityAdded:Signal1<Entity>;
    public var entityRemoved:Signal1<Entity>;

    public var componentAdded:Signal1<Component>;
    public var componentRemoved:Signal1<Component>;

    public var systems:DLL<System>;
    
    public var systemAdded:Signal1<System>;
    public var systemRemoved:Signal1<System>;

    private var componentSystemMap:Dynamic<System>;

    public function new() {
        entities = new DLL<Entity>();
        entityAdded = new Signal1<Entity>();
        entityRemoved = new Signal1<Entity>();
        componentAdded = new Signal1<Component>();
        componentRemoved = new Signal1<Component>();
        systems = new DLL<System>();
        systemAdded = new Signal1<System>();
        systemRemoved = new Signal1<System>();

        componentSystemMap = {};

        componentAdded.add(addComponentToSystem);

    }

    public function addEntity(entity:Entity) {
        entities.insertEnd(entity);
        entity.onAddedToManager(this);
        entityAdded.dispatch(entity);
    }

    public function removeEntity(entity:Entity) {
        entities.insertEnd(entity);
        entity.onRemovedFromManager();
        entityRemoved.dispatch(entity);
    }

    public function addSystem(system:System) {
        systems.insertEnd(system);
        var signal:Signal1<Component> = cast untyped componentSystemMap[system.componentInterest];
        if (signal==null) {
            signal = new Signal1<Component>();
            untyped componentSystemMap[system.componentInterest] = signal;
        }
        signal.add(system.onComponentAdded);
        system.onAddedToManager(this);
        systemAdded.dispatch(system);
    }

    public function removeSystem(system:System) {
        systems.insertEnd(system);
        var signal:Signal1<Component> = untyped componentSystemMap[system.componentInterest];
        if (signal==null) {
            signal.remove(system.onComponentAdded);
        }        
        system.onRemovedFromManager();
        systemRemoved.dispatch(system);
    }

    public function addComponentToSystem(component:Component) {
        var systemSignal:Signal1<Component> = cast untyped componentSystemMap[component.name];
        if (systemSignal!=null) {
            systemSignal.dispatch(component);
        }
    }

    public function Update(dt:Float) {
        var entity = entities.head;
        while (entity!=null) {
            var component = entity.components.head;
            while (component!=null) {
                component.onUpdate(dt);
                component=component.next;
            }
            entity=entity.next;
        }

        var system = systems.head;
        while (system!=null) {
            system.update(dt);
            system=system.next;
        }

    }
}