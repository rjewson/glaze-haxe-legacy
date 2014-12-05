
package engine.components;

import eco.core.Component;
import physics.geometry.Vector2D;

class Position extends Component
{

    public var position:Vector2D;
    public var rotation:Float;

    public function new(x:Float,y:Float,rotation:Float) {
        position = new Vector2D(x,y);
        this.rotation = rotation;
    }


}