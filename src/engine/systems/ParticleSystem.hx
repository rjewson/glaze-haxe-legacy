
package engine.systems;

import engine.components.ParticleEmitter;
import engine.core.Component;
import engine.core.System;
import wgr.particle.IParticleEngine;

class ParticleSystem extends System
{
    public var particleEngine:IParticleEngine;

    public function new(particleEngine:IParticleEngine) {
        super();
        this.particleEngine = particleEngine;
        this.componentInterest = engine.components.ParticleEmitter.NAME;
    }

    override public function onComponentAdded(component:Component) {
        cast(component,ParticleEmitter).particleEngine = particleEngine;
    }

    override public function onComponentRemoved(component:Component) {
    }

    override public function update(dt:Float) {
        particleEngine.Update();
    }
    

}