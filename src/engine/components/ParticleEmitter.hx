
package engine.components;

import engine.components.Physics;
import engine.core.Component;
import wgr.particle.IParticleEngine;

class ParticleEmitter extends Component
{
    public static inline var NAME:String = "Particle";

    public var particleEngine:IParticleEngine;
    private var physics:Physics;

    public function new() {
        this.name = NAME;
    }

    override public function onAdded() {
        this.physics = cast owner.getComponent(engine.components.Physics.NAME);
    }

    override public function onUpdate(dt:Float) {
        for (pCount in 0...5) {
            var vX = Std.random(100)-50;
            var vY = Std.random(100)-50;
            var ttl = Std.random(1000)+500;
            var type = 1;//validTiles[Std.random(validTiles.length)];
            particleEngine.EmitParticle(physics.position.x,physics.position.y,vX,vY,0,0,ttl,0.99,true,true,null,type,32,0xFFFFFFFF);
        }
    }

}