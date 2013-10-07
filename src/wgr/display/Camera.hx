
package wgr.display;

import wgr.display.DisplayObjectContainer;
import wgr.geom.Point;
import wgr.geom.AABB;

class Camera extends DisplayObjectContainer
{

    public var realPosition:Point;
    public var viewportSize:Point;
    public var halfViewportSize:Point;
    public var viewPortAABB:AABB;
    public var worldExtentsAABB:AABB;
    private var cameraExtentsAABB:AABB;

    public function new() {
        super();
        id = "Camera";
        realPosition = new Point();
        viewportSize = new Point();
        halfViewportSize = new Point();
        viewPortAABB = new AABB();
        worldExtentsAABB = new AABB();
    }

    public function Focus(x:Float,y:Float) {
        //Need to move the camera container the oposite way to the actual coords
        realPosition.x = x;
        realPosition.y = y;
        cameraExtentsAABB.fitPoint(realPosition);
        position.x = -realPosition.x+halfViewportSize.x;
        position.y = -realPosition.y+halfViewportSize.y;
    }

    public function Resize(width:Int,height:Int) {
        viewportSize.x = width;
        viewportSize.y = height;
        halfViewportSize.x = width/2;
        halfViewportSize.y = height/2;
        viewPortAABB.l = viewPortAABB.t = 0;
        viewPortAABB.r = viewportSize.x;
        viewPortAABB.b = viewportSize.y;
        cameraExtentsAABB = worldExtentsAABB.clone();
        cameraExtentsAABB.shrinkAroundCenter(width,height);
    }


}