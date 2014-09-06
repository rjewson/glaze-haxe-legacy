
package physics.collision.broadphase.managedgrid;
 
import physics.dynamics.Body;
import physics.geometry.AABB;

class Cell 
{

    public var index:Int;
    public var x:Float;
    public var y:Float;

    public var aabb:AABB;
    public var width:Float;
    public var height:Float;

    public var dynamicItems:Array<Body>;
    public var sleepingItems:Array<Body>;
    public var staticItems:Array<Body>;

    public function new(index:Int, x:Float, y:Float, w:Float, h:Float) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        aabb = new AABB(x, y + h, x + w, y);

        dynamicItems = new Array<Body>();
        sleepingItems = new Array<Body>();
        staticItems = new Array<Body>();
    }

    public function AddBody(body:Body) {
        if (body.isStatic) {
            staticItems.push(body);
        } else {
            dynamicItems.push(body);
        }
    }

    public function RemoveBody(body:Body) {
        if (body.isStatic) {
            staticItems.remove(body);
        } else {
            dynamicItems.remove(body);
        }
    }

}   