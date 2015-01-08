
package engine.components;

import eco.core.Component;
import engine.components.Position;
import wgr.display.DisplayObject;

class Display extends Component
{

    public var displayObject:DisplayObject;

    private var position:Position;

    public var id:String;
    public var tid:String;

    public function new(id:String,tid:String) {
        //this.displayObject = displayObject;
        this.id = id;
        this.tid = tid;
    }

    // public function new(displayObject:DisplayObject) {
    //     this.displayObject = displayObject;
    // }

    override public function onAdded() {
        position = owner.get(Position);
    }

    override public function update(time:Float) {
        //var position = cast owner.getComponent("Position");
        displayObject.position.x = position.position.x;
        displayObject.position.y = position.position.y;
    }

}