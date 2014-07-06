
package engine.systems;

import ash.core.Engine;
import ash.core.NodeList;
import ash.core.System;
import engine.components.Motion;
import engine.components.Position;
import engine.nodes.PhysicsNode;
import engine.physics.Collide;
import engine.physics.IBroadphase;

class PhysicsSystem extends System
{

    public var broadphases:Array<IBroadphase>;
    private var nodes:NodeList<PhysicsNode>;

    public function new(broadphases:Array<IBroadphase>) {
        super();
        this.broadphases = broadphases;
    }

    override public function addToEngine(engine:Engine):Void {
        nodes = engine.getNodeList(PhysicsNode);
        for (node in nodes)
            addToBroadphase(node);
        nodes.nodeAdded.add(addToBroadphase);
        nodes.nodeRemoved.add(removeFromBroadphase);
    }

    private function addToBroadphase(node:PhysicsNode):Void {
        for (broadphase in broadphases) {
            broadphase.add(node.collision.aabb);
        }
    }

    private function removeFromBroadphase(node:PhysicsNode):Void {
        for (broadphase in broadphases) {
            broadphase.remove(node.collision.aabb);
        }
    }

    override public function update(time:Float):Void {

        for (node in nodes) {

            var motion = node.motion;

            node.motion.forces.y += 0.8;

            motion.forces.multEquals(1/time);

            motion.velocity.plusEquals(motion.forces);

            motion.velocity.multEquals(motion.damping);

            node.motion.velocity.linearClampMax(0.5);

            motion.forces.setTo(0,0);
        }

        for (broadphase in broadphases) {
            broadphase.collide(nodes,time);
        }

        for (node in nodes) {
            node.position.position.x += (node.motion.velocity.x + node.motion.positionCorrection.x) * time;
            node.position.position.y += (node.motion.velocity.y + node.motion.positionCorrection.y) * time;
            node.motion.positionCorrection.setTo(0,0);
        }        

    }

    public function Update() {

    }

    override public function removeFromEngine(engine:Engine):Void {
        nodes = null;
    }
}