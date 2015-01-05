
package engine.ai.behaviors;

import eco.core.Entity;
import eco.signals.Signal0;

class BehaviorContext 
{

    public function entity:Entity;

    public function data:Map<String,Dynamic>;

    public function event:Signal0;

    public function new(entity:Entity) {
        this.entity = entity;
    }

}