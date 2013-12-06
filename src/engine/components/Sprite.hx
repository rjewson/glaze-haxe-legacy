
package engine.components;

import engine.components.Physics;
import engine.core.Component;
import wgr.display.DisplayObject;
import wgr.display.DisplayObjectContainer;

class Sprite extends Component
{
    public static inline var NAME:String = "Sprite";

    public var display:DisplayObject;
    private var physics:Physics;

    public function new( display:DisplayObject ) {
        this.name = NAME;
        this.display = display;
    }

    override public function onAdded() {
        this.physics = cast owner.getComponent(engine.components.Physics.NAME);
    }

    override public function onUpdate(dt:Float) {
        display.position.x = physics.position.x;
        display.position.y = physics.position.y;
        display.rotation = physics.rotation;
    }


}