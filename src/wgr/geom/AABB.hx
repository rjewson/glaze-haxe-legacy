
package wgr.geom;

class AABB 
{

    public var t:Float;
    public var r:Float;
    public var b:Float;
    public var l:Float;

    public function new() {
        t = r = b = l = 0;
    }

    public inline function reset() {
        t = l = Math.POSITIVE_INFINITY;
        r = b = Math.NEGATIVE_INFINITY;
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

}