
package engine.ai.behaviors.actions;

import engine.ai.behaviors.Behavior;
import engine.components.Physics;
import engine.ds.EntityCollection;
import engine.systems.PhysicsSystem;
import physics.dynamics.Body;
import physics.PhysicsEngine;

class GetLocalEntities extends Behavior
{

    public var range:Float;
    private var physicsEngine:PhysicsEngine;
    private var physics:Physics;

    public var entityCollection:EntityCollection;

    public function new(range:Float) {
        super();
        this.range = range;
        this.entityCollection = new EntityCollection();
    }

    override private function initialize(context:BehaviorContext):Void {
        //js.Lib.debug();
        var physicsSystem:PhysicsSystem = cast context.entity.engine.getSystemByClass(PhysicsSystem);
        physicsEngine = physicsSystem.physicsEngine;
        physics = cast context.entity.getComponentByClass(Physics);
    }

    override private function update(context:BehaviorContext):BehaviorStatus { 
        //js.Lib.debug();
        entityCollection.clear();
        physicsEngine.Search( physics.body.position , range, BodyToEntityCollection);
        //physicsEngine.actionResultCollection.RemoveBody(physics.body);
        if(entityCollection.length>0) {
            trace("Found items="+entityCollection.length);
            return Success;
        }
        return Failure;
    }

    private function BodyToEntityCollection(body:Body,distanceSqrd:Float):Void {
        trace("+");
        entityCollection.addItem(cast body.userData1);
    }

}