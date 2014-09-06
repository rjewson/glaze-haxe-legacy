
package engine.components;

import physics.geometry.Vector2D;

class Position 
{

    public var position:Vector2D;
    public var rotation:Float;

    public function new(x:Float,y:Float,rotation:Float) {
        position = new Vector2D(x,y);
        this.rotation = rotation;
    }

}