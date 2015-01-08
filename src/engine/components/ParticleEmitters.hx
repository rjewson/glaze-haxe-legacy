
package engine.components;

import eco.core.Component;
import engine.components.Position;
import wgr.particle.emitter.IParticleEmitter;
import wgr.particle.IParticleEngine;

class ParticleEmitters extends Component
{

    public var emitters:Array<IParticleEmitter>;
    public var position:Position;
    public var particleEngine:IParticleEngine;

    public function new(emitters:Array<IParticleEmitter>) {
        this.emitters = emitters;
    }

    override public function onAdded() {
        position = owner.get(Position);
    }

    public function AddEmitter(emitter:IParticleEmitter,forceEmit:Bool) {
        emitters.push(emitter);
        if (forceEmit==true && position!=null)
            emitter.update(0, position.position, particleEngine);
    }

    override public function update(time:Float) {
        for (emitter in emitters)
            emitter.update(time, position.position, particleEngine);
    }

}