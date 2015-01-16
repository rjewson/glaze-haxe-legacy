
package engine.systems;

import eco.core.Component;
import eco.core.Entity;
import eco.core.System;
import engine.components.Physics;
import physics.dynamics.Body;
import physics.PhysicsEngine;
import worldEngine.WorldData;
import worldEngine.WorldPhysicsEngine;

class PhysicsSystem extends System
{

    public var physicsEngine:PhysicsEngine;

    public var removeList:Array<Body>;

    public function new(worldData:WorldData) {
        super();
        physicsEngine = new WorldPhysicsEngine(60,60,new physics.collision.narrowphase.sat.SAT(),worldData);
        physicsEngine.masslessForces.setTo(0,9);
        removeList = new Array<Body>();
    }

    override public function get_registeredComponents ():Array<Class<Component>> {
        return [Physics];
    }

    override public function componentAdded(e:Entity,c:Class<Component>) {
        var physics:engine.components.Physics = cast e.getComponentByClass(c);
        physicsEngine.AddBody(physics.body);
    }

    override public function componentRemoved(e:Entity,c:Class<Component>) {
        //Store removed bodies for removal outside the update
        var physics = e.get(Physics);
        removeList.push(physics.body);
    }

    override public function update(time:Float) {
        //Clean out all the old bodies
        while (removeList.length>0) {
            physicsEngine.RemoveBody(removeList.pop());
        }
        physicsEngine.Step();
    }

}