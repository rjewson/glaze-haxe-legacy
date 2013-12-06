
package wgr.particle;

import wgr.geom.Point;

interface IParticleEngine 
{
    function Update():Void;
    function EmitParticle(x:Float, y:Float, vX:Float, vY:Float, fX:Float, fY:Float, ttl:Int, damping:Float, decayable:Bool, top:Bool, externalForce:Point, type:Int, data1:Float, data2:Float):Bool;
}