
package engine.ai.behaviors.actions;

import engine.ai.behaviors.Behavior;
import engine.systems.PhysicsSystem;
import physics.PhysicsEngine;

class GetLocalEntities extends Behavior
{

    public var range:Float;
    private var physicsEngine:PhysicsEngine;

    public function new(range:Float) {
        super();
        this.range = range;
    }

    override private function initialize(context:BehaviorContext):Void {
        var physicsSystem:PhysicsSystem = cast context.entity.engine.getSystemByClass(PhysicsSystem);
        physicsEngine = physicsSystem.physicsEngine;
    }

    override private function update(context:BehaviorContext):BehaviorStatus { 
        trace(physicsEngine.step);
        return Success;
    }

}