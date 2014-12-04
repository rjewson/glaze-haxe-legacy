
package engine.systems;

import ash.core.Engine;
import ash.core.NodeList;
import ash.core.System;
import engine.components.Position;
import engine.nodes.ParticleNode;
import physics.geometry.Vector2D;
import wgr.particle.IParticleEngine;

class ParticleSystem extends System
{

    private var nodes:NodeList<ParticleNode>;

    private var particleEngine:IParticleEngine;

    public function new(particleEngine:IParticleEngine) {
        super();
        this.particleEngine = particleEngine;
    }
 
    override public function addToEngine(engine:Engine):Void {
        nodes = engine.getNodeList(ParticleNode);
    }

    override public function update(time:Float):Void {
        for (node in nodes)
        {
            var position:Vector2D = node.position.position;
            particleEngine.EmitParticle(position.x,position.y,utils.Random.RandomFloat(-100,100),utils.Random.RandomFloat(-100,100),0,0,800,0.95,true,false,null,4,255,255,255,255);

        }

        particleEngine.Update();

    }


}