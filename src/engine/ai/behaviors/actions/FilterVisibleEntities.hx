
package engine.ai.behaviors.actions;

import engine.components.Position;
import engine.ds.EntityCollection;
import engine.systems.PhysicsSystem;
import physics.geometry.Ray;
import physics.PhysicsEngine;

class FilterVisibleEntities extends Behavior
{

    private var breakOnFirstVisible:Bool;
    private var initialized:Bool = false;

    private var physicsEngine:PhysicsEngine;

    private var ray:Ray;
    private var range:Float;
    private var sourcePosition:Position;

    public function new(range:Float,breakOnFirstVisible:Bool = true) {
        super();
        this.range = range;
        this.breakOnFirstVisible = breakOnFirstVisible;
    }

    override private function initialize(context:BehaviorContext):Void {
        if (!initialized) {
            var physicsSystem:PhysicsSystem = cast context.entity.engine.getSystemByClass(PhysicsSystem);
            physicsEngine = physicsSystem.physicsEngine;
            ray = new Ray();
            sourcePosition = context.entity.get(Position);
            initialized = true;
        }
    }

    override private function update(context:BehaviorContext):BehaviorStatus { 
        if (context.data.exists("entities")) {
            var entityCollection:EntityCollection = cast context.data.get("entities");
            var item = entityCollection.entities.head;
            while (item!=null) {
                var itemPosition = item.entity.get(Position);
                ray.SetParams( sourcePosition.position , itemPosition.position , 0);
                physicsEngine.CastRay(ray);
                if (ray.Seen()) {
                    if (breakOnFirstVisible) {
                        return Success;
                    }
                }
                item = item.next;
            }                       
        }
        return Failure;
    }

}