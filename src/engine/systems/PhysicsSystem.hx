
package engine.systems;

import ash.core.Engine;
import ash.core.NodeList;
import ash.core.System;
import engine.components.Position;
import engine.graphics.StaticLayerDisplayManager;
import engine.nodes.PhysicsNode;
import physics.collision.broadphase.managedgrid.ManagedGrid;
import physics.geometry.Ray;
import physics.geometry.Vector2D;
import physics.PhysicsEngine;
import worldEngine.World;
import worldEngine.WorldData;
import worldEngine.WorldPhysicsEngine;

class PhysicsSystem extends System
{

    private var nodes:NodeList<PhysicsNode>;

    public var physicsEngine:PhysicsEngine;

    public function new(worldData:WorldData) {
        super();
        physicsEngine = new WorldPhysicsEngine(60,60,new physics.collision.narrowphase.sat.SAT(),worldData);
        var ray:Ray = new Ray();
        ray.SetParams(new Vector2D(64,64),new Vector2D(64,100),1000);
        //js.Lib.debug();
        var result = physicsEngine.CastRay(ray);
        trace(result);

        var staticLayer = new StaticLayerDisplayManager(worldData,600);
        physicsEngine.masslessForces.setTo(0,9);
    }

    override public function addToEngine(engine:Engine):Void {
        nodes = engine.getNodeList(PhysicsNode);
        for (node in nodes)
            addToPhysicsEngine(node);
        nodes.nodeAdded.add(addToPhysicsEngine);
        nodes.nodeRemoved.add(removeFromPhysicsEngine);
    }

    private function addToPhysicsEngine(node:PhysicsNode):Void {
        physicsEngine.AddBody(node.physics.body);
        node.position.position = node.physics.body.position;
    }

    private function removeFromPhysicsEngine(node:PhysicsNode):Void {
        physicsEngine.RemoveBody(node.physics.body);
    }

    override public function update(time:Float):Void {
        physicsEngine.Step();
    }

    override public function removeFromEngine(engine:Engine):Void {
        nodes = null;
    }
}