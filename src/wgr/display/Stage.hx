
package wgr.display;

import wgr.display.DisplayObjectContainer;

class Stage extends DisplayObjectContainer
{

    public function new() {
        super();
    }

    public override function updateTransform() {
        for (child in children) {
            child.updateTransform();
        }
    }

}