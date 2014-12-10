
package wgr.particle.emitter;

import physics.geometry.Vector2D;

interface IParticleEmitter 
{

    function update(time:Float, position:Vector2D, engine:IParticleEngine):Void;

}
