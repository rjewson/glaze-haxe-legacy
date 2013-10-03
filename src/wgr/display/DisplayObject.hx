
package wgr.display;

import js.html.Float32Array;
import wgr.display.DisplayObjectContainer;
import wgr.display.Stage;
import wgr.geom.Matrix3;
import wgr.geom.Point;
import wgr.geom.AABB;

class DisplayObject 
{
    public var id:String;
    public var position:Point;
    public var scale:Point;
    public var pivot:Point;
    public var rotation(get,set):Float;
    private var _rotation:Float;
    private var _rotationComponents:Point;
    public var alpha:Float;
    public var visible(get,set):Bool;
    private var _visible:Bool;

    public var aabb:AABB;

    public var parent:DisplayObjectContainer;
    // public var stage(get,never):Stage;
    public var stage:Stage;

    public var worldTransform:Float32Array;
    public var worldAlpha:Float;
    public var localTransform:Float32Array;

    public function new() {
        position = new Point();
        scale = new Point(1,1);
        pivot = new Point();
        _rotationComponents = new Point();
        rotation = 0;
        alpha = 1;
        visible = true;
        aabb = new AABB();
        parent = null;
        worldTransform = Matrix3.Create();
        localTransform = Matrix3.Create();
    }

    public inline function get_rotation():Float {  
        return _rotation;
    }

    public inline function set_rotation(v:Float):Float {
        _rotation = v;
        _rotationComponents.x = Math.cos(_rotation);
        _rotationComponents.y = Math.sin(_rotation);
        return _rotation;
    }

    public inline function get_visible():Bool {  
        return _visible;
    }

    public inline function set_visible(v:Bool):Bool {
        _visible = v;
        if (stage!=null)
            stage.dirty = true;
        return _visible;
    }

    public function updateTransform() {
        //TODO Rounding at the moment...
        position.x = Math.floor(position.x);
        position.y = Math.floor(position.y);

        var sinR = _rotationComponents.y;//Math.sin(rotation);
        var cosR = _rotationComponents.x;//Math.cos(rotation);
        
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

    //TODO Probably get rid of this...
    public function applySlot(slot:DisplayObject->Dynamic->Void,p:Dynamic=null) {
        slot(this,p);    
    }


}