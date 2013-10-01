
package wgr.display;

import wgr.display.DisplayObjectContainer;
import wgr.geom.Point;

class Camera extends DisplayObjectContainer
{

    public var viewportSize:Point;
    public var halfViewportSize:Point;

    public function new() {
        super();
        id = "Camera";
        viewportSize = new Point();
        halfViewportSize = new Point();
    }

    public function Focus(x:Float,y:Float) {
        position.x = -x+halfViewportSize.x;
        position.y = -y+halfViewportSize.y;
    }

    public function Resize(width:Int,height:Int) {
        viewportSize.x = width;
        viewportSize.y = height;
        halfViewportSize.x = width/2;
        halfViewportSize.y = height/2;
    }


}