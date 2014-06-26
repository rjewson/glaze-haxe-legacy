
package engine.components;

import geom.Vector2D;

class Collision 
{

    public var aabb:geom.AABB;

    public function new( width:Float , height:Float  ) {
        this.aabb = new geom.AABB(width,height);
    }

}