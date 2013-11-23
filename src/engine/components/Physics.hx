
package engine.components;

import engine.Component;
import physics.geometry.Vector2D;

class Physics extends Component
{

   public static inline var NAME:String = "Physics";

    public var position:Vector2D;
    public var rotation:Float;

    public function new( x:Float , y:Float , rotation:Float ) {
        this.name = NAME;
        this.position = new Vector2D(x,y);
        this.rotation = rotation;
    }

    override public function onUpdate(dt:Float) {
        this.rotation += 0.04;
    }

}