
package wgr.particle;

import wgr.geom.Point;

class PointSpriteParticle
{

    public static var ZERO_FORCE:Point = new Point();
    public static var INV_ALPHA:Float = 1/255;
    
    public var pX:Float;
    public var pY:Float;

    public var vX:Float;
    public var vY:Float;
    
    public var fX:Float;
    public var fY:Float;
    
    public var type:Float;
    public var size:Float;

    public var externalForce:Point;
    
    public var age:Float;
    public var ttl:Float;
    public var damping:Float;
    
    public var decay:Float;
    public var colour:Float;
    public var alpha:Float;

    public var next:PointSpriteParticle;
    public var prev:PointSpriteParticle;

    public function new() 
    {
    }
    
    inline public function Initalize(x:Float, y:Float, vX:Float, vY:Float, fX:Float, fY:Float, ttl:Int, damping:Float, decay:Float, top:Bool, externalForce:Point, type:Int, data1:Float, data2:Float) {
        this.pX = x;
        this.pY = y;
        this.vX = vX;
        this.vY = vY;
        this.fX = fX;
        this.fY = fY;
        this.ttl = ttl;
        this.age = ttl;
        this.damping = damping;
        this.decay = decay;
        this.externalForce = externalForce != null ? externalForce : ZERO_FORCE;
        this.type = type;
        this.size = data1;
        this.colour = data2;
        this.alpha = untyped{ (this.colour & 0xFF) * INV_ALPHA; }
    }
    
    inline public function Update(deltaTime:Float,invDeltaTime:Float):Bool {
        vX += fX + externalForce.x;
        vY += fY + externalForce.y;
        vX *= damping;
        vY *= damping;
        pX += vX * invDeltaTime;
        pY += vY * invDeltaTime;
        age -= deltaTime;
        alpha -= decay;
        return age > 0;
    }
    
}