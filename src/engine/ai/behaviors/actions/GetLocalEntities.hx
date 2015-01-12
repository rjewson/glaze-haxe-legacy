
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

    private var initialized:Bool = false;

    public var entityCollection:EntityCollection;

    public function new(range:Float) {
        super();
        this.range = range;
        this.entityCollection = new EntityCollection();
    }

    override private function initialize(context:BehaviorContext):Void {
        if (!initialized) {
            var physicsSystem:PhysicsSystem = cast context.entity.engine.getSystemByClass(PhysicsSystem);
            physicsEngine = physicsSystem.physicsEngine;
            physics = context.entity.get(Physics);
            initialized = true;
        }
    }

    override private function update(context:BehaviorContext):BehaviorStatus { 
        entityCollection.clear();
        physicsEngine.Search( physics.body.position , range, BodyToEntityCollection);
        if(entityCollection.length>0) {
            //trace("Found items="+entityCollection.length);
            context.data.set("entities",entityCollection);
            return Success;
        }
        return Failure;
    }

    private function BodyToEntityCollection(body:Body,distanceSqrd:Float):Void {
        entityCollection.addItem(cast body.userData1.owner);
    }

}