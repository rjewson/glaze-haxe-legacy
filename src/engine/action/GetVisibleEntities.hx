
package engine.action;

import engine.components.Physics;
import engine.components.Position;
import engine.systems.PhysicsSystem;
import physics.PhysicsEngine;
import physics.collision.broadphase.action.ActionResultCollection;
import worldEngine.WorldPhysicsEngine;

class GetVisibleEntities extends Action
{

    public var range:Float;

    private var physicsEngine:PhysicsEngine;
    private var physics:Physics;

    public function new(range:Float) {
        super();
        this.range = range;
    }

    override public function onStart() {
        super.onStart();
        var owner = getRootOwner();
        var physicsSystem:PhysicsSystem = cast owner.engine.getSystemByClass(PhysicsSystem);
        physicsEngine = physicsSystem.physicsEngine;
        physics = cast owner.getComponentByClass(Physics);
    }

    override public function update(time:Float) {
        // trace(" PE="+physicsEngine.step);
        //js.Lib.debug();

        physicsEngine.Search( physics.body.position , range);
        physicsEngine.actionResultCollection.RemoveBody(physics.body);
        if(physicsEngine.actionResultCollection.resultCount>0) {
            trace(physicsEngine.actionResultCollection);
        }
    }    

}