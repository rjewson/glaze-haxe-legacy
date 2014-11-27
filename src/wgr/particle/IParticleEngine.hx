
package wgr.particle;

import wgr.geom.Point;

interface IParticleEngine 
{
    function Update():Void;
    function EmitParticle(x:Float, y:Float, vX:Float, vY:Float, fX:Float, fY:Float, ttl:Int, damping:Float, decayable:Bool, top:Bool, externalForce:Point, data1:Int, data2:Int, data3:Int,data4:Int,data5:Int):Bool;
}