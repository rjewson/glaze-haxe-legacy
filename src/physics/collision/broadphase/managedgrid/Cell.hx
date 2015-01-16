
package physics.collision.broadphase.managedgrid;
 
import haxe.ds.GenericStack;
import physics.dynamics.Body;
import physics.geometry.AABB;
import physics.geometry.Vector2D;


class Cell 
{

    public var index:Int;
    public var x:Float;
    public var y:Float;

    public var aabb:AABB;
    public var width:Float;
    public var height:Float;

    public var dynamicItems:GenericStack<Body>;
    public var sleepingItems:GenericStack<Body>;
    public var staticItems:GenericStack<Body>;

    public var dynamicItemLength:Int = 0;
    public var sleepingCount:Int = 0;
    public var staticItemLength:Int = 0;

    public var persistentActivity:Bool;
    public var transientActivity:Bool;

    public var adjacentCells:Array<Cell>;

    public var manager:ManagedGrid;

    public function new(manager:ManagedGrid,index:Int, x:Float, y:Float, w:Float, h:Float) {
        this.manager = manager;
        this.index = index;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        aabb = new AABB(x, y + h, x + w, y);

        dynamicItems = new GenericStack<Body>();
        sleepingItems = new GenericStack<Body>();
        staticItems = new GenericStack<Body>();

        adjacentCells = new Array<Cell>();
    }

    public function AddBody(body:Body) {
        if (body.isStatic) {
            staticItems.add(body);
            staticItemLength++;
        } else {
            dynamicItems.add(body);
            dynamicItemLength++;
        }
    }

    public function RemoveBody(body:Body) {
        if (body.isStatic) {
            staticItems.remove(body);
            staticItemLength--;
        } else {
            dynamicItems.remove(body);
            dynamicItemLength--;
        }
    }

    public function Collide():Void {
        var s1 = dynamicItems.head;
        while ( s1 != null ) {
            
            var item1 = s1.elt;
            var s2 = s1.next;
            while ( s2 != null ) {
                var item2 = s2.elt;
                
                //manager.CheckDoubleCollisions(item1, item2);
                
                if (AABB.intersects(item1.aabb, item1.position, item2.aabb, item2.position))
                    manager.narrowphase.CollideBodies(item1, item2);
                
                s2 = s2.next;
            }
            
            var s3 = staticItems.head;
            while (s3 != null) {
                var item3 = s3.elt;
                
                if (AABB.intersects(item1.aabb, item1.position, item3.aabb, item3.position))
                    manager.narrowphase.CollideBodies(item1, item3);
                
                s3 = s3.next;
            }
            
            var s4 = sleepingItems.head;
            while (s4 != null) {
                var item4 = s4.elt;
                
                if (AABB.intersects(item1.aabb, item1.position, item4.aabb, item4.position))
                    manager.narrowphase.CollideBodies(item1, item4);
                
                s4 = s4.next;
            }
            
            //AdditionalCollide(item1);
            
            s1 = s1.next;
        }
    }

    function SearchList(list:GenericStack<Body>, position:Vector2D,radius:Float, result:Body->Float->Void):Void {
        var radiusSqrd = radius*radius;
        for (body in list) {
                var dX : Float = position.x - body.averageCenter.x;
                var dY : Float = position.y - body.averageCenter.y;
                var dSqrd : Float = dX * dX + dY * dY;
                if (dSqrd <= (radiusSqrd - body.radiusSqrd)) {
                    result(body,dSqrd);
                }
        }
    }
    public function SearchCell(position:Vector2D,radius:Float,result:Body->Float->Void):Void {
        SearchList(dynamicItems,position,radius,result);
        //SearchList(sleepingItems, action, actionResultCollection);
        //SearchList(staticItems, action, actionResultCollection);
    }

}   