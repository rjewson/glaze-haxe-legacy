
package wgr.display;

import wgr.display.DisplayObjectContainer;
import wgr.geom.Point;
import wgr.geom.AABB;

class Camera extends DisplayObjectContainer
{

    public var viewportSize:Point;
    public var halfViewportSize:Point;
    public var viewPortAABB:wgr.geom.AABB;

    public function new() {
        super();
        id = "Camera";
        viewportSize = new Point();
        halfViewportSize = new Point();
        viewPortAABB = new AABB();
    }

    public function Focus(x:Float,y:Float) {
        //Need to move the camera container the oposite way to the actual coords
        viewPortAABB.l = position.x = -x+halfViewportSize.x;
        viewPortAABB.t = position.y = -y+halfViewportSize.y;
        viewPortAABB.r = viewPortAABB.l + viewportSize.x;
        viewPortAABB.b = viewPortAABB.t + viewportSize.y;
    }

    public function Resize(width:Int,height:Int) {
        viewportSize.x = width;
        viewportSize.y = height;
        halfViewportSize.x = width/2;
        halfViewportSize.y = height/2;
    }


}