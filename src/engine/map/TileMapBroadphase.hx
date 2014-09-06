

package engine.map;

import ash.core.NodeList;
import engine.map.tmx.TmxLayer;
import engine.nodes.PhysicsNode;
import engine.physics.Collide;
import engine.physics.Contact;
import engine.physics.IBroadphase;
import geom.Vector2D;

class TileMapBroadphase implements IBroadphase
{

    public var collisionLayer:TmxLayer;
    var tileSize:Int;
    var invTileSize:Float;
    var tileScale:Int;

    public function new(layer:TmxLayer) {
        tileScale = 4;
        this.collisionLayer = layer;
        this.tileSize = layer.map.tileWidth * tileScale;
        trace(this.tileSize);
        this.invTileSize = 1 / tileSize;
    }

    public function add(shape:geom.AABB):Void {
        trace('add');
    }

    public function remove(shape:geom.AABB):Void {
        trace('remove');
    }

    public function IsInternalCollision(tileX:Int,tileY:Int,normal:Vector2D):Bool {
        var tile = collisionLayer.tileGIDs.get(untyped tileX+normal.x,untyped tileY+normal.y);
        return tile>0;
    }

    public function collide(nodes:NodeList<PhysicsNode>,time:Float):Void {

        var tileAABB = new geom.AABB(tileSize/2,tileSize/2);
        var tilePosition = new Vector2D();
        var contact = new Contact();

        for (node in nodes) {
            var position = node.position.position;
            var motion = node.motion;
            var extents = node.collision.aabb.extents;

            motion.preOnGround = motion.onGround;
            motion.onGround = false;

            var predictedPos:Vector2D = position.plus(motion.velocity.mult(time));

            var min:Vector2D = new Vector2D( Math.min(position.x,predictedPos.x) , Math.min(position.y,predictedPos.y) );
            var max:Vector2D = new Vector2D( Math.max(position.x,predictedPos.x) , Math.max(position.y,predictedPos.y) );

            min.minusEquals(extents);
            max.plusEquals(extents);

            var x1 = Math.floor(Index(min.x));
            var y1 = Math.floor(Index(min.y));
            var x2 = Math.ceil(Index(max.x));
            var y2 = Math.ceil(Index(max.y));

            var result:String = "";

            for( x in x1...x2 ) {
                for ( y in y1...y2 ) {
                    var tile = collisionLayer.tileGIDs.get(x,y);
                    if (tile>0) {
                        tilePosition.x = (x*tileSize)+(tileSize/2);
                        tilePosition.y = (y*tileSize)+(tileSize/2);

                        if (engine.physics.Collide.IntersectAABBvsSegment( tileAABB.extents, tilePosition , position , predictedPos.minus(position), node.collision.aabb.extents.x, node.collision.aabb.extents.y )) {
                            engine.physics.Collide.AABBvsAABB( node.collision.aabb , position , tileAABB , tilePosition , contact);
                            if (!IsInternalCollision(x,y,contact.normal))
                                engine.physics.Collide.CollisionResponse(contact,motion,time);
                            result+=x+":"+y+" ";
                        }

                    }

                }
            }
            //trace(result);           
        }
    }


    public function collide2(nodes:NodeList<PhysicsNode>):Void {
        for (node in nodes) {
            var position = node.position.position;
            //trace(position.x+" "+position.y);
            //trace("start");
            var result:String = "";
            var extents = node.collision.aabb.extents;
            var x1 = Math.floor(Index(position.x-extents.x));
            var y1 = Math.floor(Index(position.y-extents.y));
            var x2 = Math.ceil(Index(position.x+extents.x));
            var y2 = Math.ceil(Index(position.y+extents.y));
            //trace(x1,y1,x2,y2);
            for( x in x1...x2 ) {
                for ( y in y1...y2 ) {
                    var tile = collisionLayer.tileGIDs.get(x,y);
                    if (tile>0)
                       result+=x+":"+y+" ";
                }
            }
            trace(result);           
        }
    }

    inline public function Index(value:Float):Float {
        //FIXME Not sure this always works...
        //return Std.int(value / cellSize);
        //return Math.floor(value * invCellSize);
        // js.Lib.debug();
        return (value * invTileSize);
    }   

}