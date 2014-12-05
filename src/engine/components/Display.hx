
package engine.components;

import eco.core.Component;
import wgr.display.DisplayObject;

class Display extends Component
{

    public var displayObject:DisplayObject;

    public function new(displayObject:DisplayObject) {
        this.displayObject = displayObject;
    }

    override public function update(time:Float) {
        var position = cast owner.getComponent("Position");
        displayObject.position.x = position.position.x;
        displayObject.position.y = position.position.y;
    }

}