
package physics.collision.broadphase.managedgrid;
 
import physics.dynamics.Body;
import physics.geometry.AABB;
import physics.collision.broadphase.action.ActionResultCollection;
import physics.geometry.Vector2D;


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

    public var adjacentCells:Array<Cell>;

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

        adjacentCells = new Array<Cell>();
    }

    public function AddBody(body:Body) {
        body.broadphaseData1 = index;
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
        body.broadphaseData1 = -1;
    }

    function SearchList(list:Array<Body>, position:Vector2D,radius:Float, actionResultCollection:ActionResultCollection):Void {
        var radiusSqrd = radius*radius;
        for (body in list) {
                var dX : Float = position.x - body.averageCenter.x;
                var dY : Float = position.y - body.averageCenter.y;
                var dSqrd : Float = dX * dX + dY * dY;
                if (dSqrd <= (radiusSqrd - body.radiusSqrd)) {
                    actionResultCollection.AddResult(body,dSqrd);
                }
        }
    }
    public function SearchCell(position:Vector2D,radius:Float,result:ActionResultCollection):Void {
        SearchList(dynamicItems,position,radius,result);
        //SearchList(sleepingItems, action, actionResultCollection);
        //SearchList(staticItems, action, actionResultCollection);
    }

}   