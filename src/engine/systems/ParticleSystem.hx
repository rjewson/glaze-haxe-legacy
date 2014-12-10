
package engine.systems;

import eco.core.Component;
import eco.core.Entity;
import eco.core.System;
import engine.components.ParticleEmitters;
import wgr.particle.IParticleEngine;

class ParticleSystem extends System
{

    public var particleEngine:IParticleEngine;

    public function new(particleEngine:IParticleEngine) {
        super();
        this.particleEngine = particleEngine;
    }

    override public function get_registeredComponents ():Array<Class<Component>> {
        return [ParticleEmitters];
    } 

    override public function componentAdded(e:Entity,c:Class<Component>) {
        var particleEmitters:ParticleEmitters = cast e.getComponentByClass(c);
        particleEmitters.particleEngine = particleEngine;
    }

    override public function update(time:Float) {
        particleEngine.Update();
    }


}