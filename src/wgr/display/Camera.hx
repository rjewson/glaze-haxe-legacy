
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
        position.x = -x+halfViewportSize.x;
        position.y = -y+halfViewportSize.y;


        // viewPortAABB.l = viewPortAABB.r = x - halfViewportSize.x;
        // viewPortAABB.t = viewPortAABB.b = y - halfViewportSize.y;
        // viewPortAABB.r += viewportSize.x;
        // viewPortAABB.b += viewportSize.y;
    }

    public function Resize(width:Int,height:Int) {
        viewportSize.x = width;
        viewportSize.y = height;
        halfViewportSize.x = width/2;
        halfViewportSize.y = height/2;
        viewPortAABB.l = viewPortAABB.t = 0;
        viewPortAABB.r = viewportSize.x;
        viewPortAABB.b = viewportSize.y;
    }


}