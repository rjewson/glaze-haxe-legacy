
package geom;

import geom.Vector2D;

class AABB 
{

    public var extents:Vector2D;
    public var position:Vector2D;

    public function new(width:Float,height:Float) {
        extents = new Vector2D(width,height);
        position = new Vector2D();
    }

}