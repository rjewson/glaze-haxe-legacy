
package engine.components;

import eco.core.Component;
import engine.components.Position;
import physics.geometry.Vector2D;

class CameraController extends Component
{

    public var threshold:Float;

    public function new() {

    }

    public function getPosition():Position {
        var position:Position = cast owner.getComponent("Position");
        return position;
    }

}