
package engine.ai.behaviors.actions;

import engine.ai.behaviors.Behavior;
import engine.ds.EntityCollection;

class FilterPrioritizeEntities extends Behavior
{

    public function new() {
        super();
    }

    override private function update(context:BehaviorContext):BehaviorStatus { 
        if (context.data.exists("entities")) {
            var entityCollection:EntityCollection = cast context.data.get("entities");
            return Success;
        }
        return Failure;
    }

}