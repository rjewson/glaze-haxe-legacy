
package wgr.display;

import js.html.Float32Array;
import wgr.display.DisplayObjectContainer;
import wgr.geom.Matrix3;
import wgr.geom.Point;

class DisplayObject 
{
    public var id:String;
    public var position:Point;
    public var scale:Point;
    public var pivot:Point;
    public var rotation:Float;
    public var alpha:Float;
    public var visible:Bool;
    public var renderable:Bool;

    public var parent:DisplayObjectContainer;

    public var worldTransform:Float32Array;
    public var worldAlpha:Float;
    public var localTransform:Float32Array;

    public function new() {
        position = new Point();
        scale = new Point(1,1);
        pivot = new Point();
        rotation = 0;
        alpha = 1;
        visible = true;
        renderable = true;
        parent = null;
        worldTransform = Matrix3.Create();
        localTransform = Matrix3.Create();
    }

    public function updateTransform() {
        var sinR = Math.sin(rotation);
        var cosR = Math.cos(rotation);
        
        localTransform[0] =  cosR * scale.x;
        localTransform[1] = -sinR * scale.y;
        localTransform[3] =  sinR * scale.x;
        localTransform[4] =  cosR * scale.y;

        var px = pivot.x;
        var py = pivot.y;

        var parentTransform = parent.worldTransform;

        var a00 = localTransform[0], a01 = localTransform[1], a02 = position.x - localTransform[0] * px - py * localTransform[1],
        a10 = localTransform[3], a11 = localTransform[4], a12 = position.y - localTransform[4] * py - px * localTransform[3],

        b00 = parentTransform[0], b01 = parentTransform[1], b02 = parentTransform[2],
        b10 = parentTransform[3], b11 = parentTransform[4], b12 = parentTransform[5];

        localTransform[2] = a02;
        localTransform[5] = a12;

        worldTransform[0] = b00 * a00 + b01 * a10;
        worldTransform[1] = b00 * a01 + b01 * a11;
        worldTransform[2] = b00 * a02 + b01 * a12 + b02;

        worldTransform[3] = b10 * a00 + b11 * a10;
        worldTransform[4] = b10 * a01 + b11 * a11;
        worldTransform[5] = b10 * a02 + b11 * a12 + b12;

        worldAlpha = alpha*parent.worldAlpha;

    }

}