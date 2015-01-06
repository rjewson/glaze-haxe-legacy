
package engine.ai.behaviors;

import eco.core.Entity;
import eco.signals.Signal0;

class BehaviorContext 
{

    public var entity:Entity;

    public var data:Map<String,Dynamic>;

    public var event:Signal0;

    public var time:Float;

    public function new(entity:Entity) {
        this.entity = entity;
        this.time = 0;
    }

}