
package wgr.geom;

import wgr.geom.Point;

class AABB 
{

    public var t:Float;
    public var r:Float;
    public var b:Float;
    public var l:Float;
    public var width(get,never):Float;
    public var height(get,never):Float;

    public function new(t=.0,r=.0,b=.0,l=.0) {
        this.t = t;
        this.r = r;
        this.b = b;
        this.l = l;
    }

    public function clone():AABB {
        return new AABB(t,r,b,l);
    }

    public inline function reset() {
        t = l = Math.POSITIVE_INFINITY;
        r = b = Math.NEGATIVE_INFINITY;
    }

    public inline function get_width():Float {  
        return r-l;
    }

    public inline function get_height():Float {  
        return b-t;
    }

    public inline function intersect(aabb:AABB):Bool {
        if (l > aabb.r)
            return false;
        else if (r < aabb.l)
            return false;
        else if (t > aabb.b)
            return false;
        else if (b < aabb.t)
            return false;
        else return true;
    }

    public inline function addAABB(aabb:AABB) {
        if (aabb.t<t) t=aabb.t;
        if (aabb.r>r) r=aabb.r;
        if (aabb.b>b) b=aabb.b;
        if (aabb.l<l) l=aabb.l;
    }

    public inline function addPoint(x:Float,y:Float) {
        if (y<t) t=y;
        if (x>r) r=x;
        if (y>b) b=y;
        if (x<l) l=x;
    }

    public inline function fitPoint(point:Point) {
        if (point.x<l) point.x=l;
        if (point.x>r) point.x=r;
        if (point.y<t) point.y=t;
        if (point.y>b) point.y=b;
    }

    public inline function shrinkAroundCenter(deltaWidth:Float,delatHeight:Float) {
        l += deltaWidth/2;
        r -= deltaWidth/2;
        t += delatHeight/2;
        b -= delatHeight/2;
    }

}