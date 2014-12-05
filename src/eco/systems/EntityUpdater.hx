
package eco.systems;

import eco.core.Entity;
import eco.core.System;

class EntityUpdater extends System
{
    
    public var entities:Array<Entity>;

    public function new(entities:Array<Entity>) {
        super();
        this.entities = entities;
    }

    override public function update(time:Float) {
        for (entity in entities)
            entity.update(time);
    }


}