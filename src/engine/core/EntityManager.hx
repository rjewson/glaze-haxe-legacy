
package engine.core;

import engine.core.Entity;
import ds.DLL;
import engine.core.signals.Signal;
import engine.core.signals.Signal1;

class EntityManager 
{

    public var entities:DLL<Entity>;
    public var entityAddedSignal:Signal1<Entity>;

    public function new() {
        entities = new DLL<Entity>();
        entityAddedSignal = new Signal1<Entity>();
    }

    public function add(entity:Entity) {
        entities.insertEnd(entity);
        entityAddedSignal.dispatch(entity);
    }

    public function remove(entity:Entity) {
        entities.insertEnd(entity);
        entityAddedSignal.dispatch(entity);
    }

    public function Update(dt :Float) {
        var entity = entities.head;
        while (entity!=null) {
            var component = entity.components.head;
            while (component!=null) {
                component.onUpdate(dt);
                component=component.next;
            }
            entity=entity.next;
        }
    }
}