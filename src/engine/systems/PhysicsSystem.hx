
package engine.systems;

import eco.core.Component;
import eco.core.Entity;
import eco.core.System;
import engine.components.Physics;
import physics.PhysicsEngine;
import worldEngine.WorldData;
import worldEngine.WorldPhysicsEngine;

class PhysicsSystem extends System
{

    public var physicsEngine:PhysicsEngine;

    public function new(worldData:WorldData) {
        super();
        physicsEngine = new WorldPhysicsEngine(60,60,new physics.collision.narrowphase.sat.SAT(),worldData);
        physicsEngine.masslessForces.setTo(0,9);
    }

    override public function get_registeredComponents ():Array<Class<Component>> {
        return [Physics];
    }

    override public function componentAdded(e:Entity,c:Class<Component>) {
        var physics:engine.components.Physics = cast e.getComponentByClass(c);
        physicsEngine.AddBody(physics.body);
    }

    override public function componentRemoved(e:Entity,c:Class<Component>) {
        var physics:engine.components.Physics = cast e.getComponentByClass(c);
        trace("removed Physics");
    }

    override public function update(time:Float) {
        physicsEngine.Step();
    }

}