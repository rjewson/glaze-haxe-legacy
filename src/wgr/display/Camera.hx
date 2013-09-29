
package wgr.display;

import wgr.display.DisplayObjectContainer;
import wgr.geom.Point;

class Camera extends DisplayObjectContainer
{

    public var viewportSize:Point;

    public function new() {
        super();
        viewportSize = new Point();
    }

    public function Resize(width:Int,height:Int) {
        viewportSize.x = width;
        viewportSize.y = height;
    }


}