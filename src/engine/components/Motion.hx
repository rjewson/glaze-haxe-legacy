
package engine.components;

import geom.Vector2D;

class Motion 
{

    public var velocity:Vector2D;
    public var positionCorrection:Vector2D;
    public var delta:Vector2D;
    public var damping:Float;
    public var angularVelocity:Float;

    public var forces:Vector2D;

    public var onGround:Bool;
    public var preOnGround:Bool;

    public function new(velocityX:Float=.0,velocityY:Float=.0,angularVelocity:Float=.0,damping:Float=0.99999) {
        this.velocity = new Vector2D(velocityX,velocityY);
        this.positionCorrection = new Vector2D();
        this.angularVelocity = angularVelocity;
        this.damping = damping;
        this.forces = new Vector2D();
        this.onGround = false;
        this.preOnGround = false;
    }

}