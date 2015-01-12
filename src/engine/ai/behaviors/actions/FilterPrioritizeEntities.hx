
package engine.ai.behaviors.actions;

import engine.ai.behaviors.Behavior;
import engine.components.Position;
import engine.ds.EntityCollection;

class FilterPrioritizeEntities extends Behavior
{

    public function new() {
        super();
    }

    override private function update(context:BehaviorContext):BehaviorStatus { 
        if (context.data.exists("entities")) {
            var entityCollection:EntityCollection = cast context.data.get("entities");
            var entity = entityCollection.entities.head.entity;
            var position = entity.get(Position);
            context.data.set("target",position.position.clone());
            return Success;
        }
        return Failure;
    }

}