
package engine.components;

import engine.Component;
import wgr.display.DisplayObject;
import wgr.display.DisplayObjectContainer;

class Sprite extends Component
{
    public static inline var NAME:String = "Sprite";

    public var display:DisplayObject;

    public function new( display:DisplayObject ) {
        this.name = NAME;
        this.display = display;
    }

    override public function onUpdate(dt:Float) {
        var physics:engine.components.Physics = cast owner.getComponent(engine.components.Physics.NAME);
        display.position.x = physics.position.x;
        display.position.y = physics.position.y;
    }


}