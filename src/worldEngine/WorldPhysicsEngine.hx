package worldEngine;

import ds.Array2D;
import physics.collision.broadphase.managedgrid.ManagedGrid;
import physics.collision.narrowphase.INarrowphase;
import physics.dynamics.Body;
import physics.dynamics.Feature;
import physics.dynamics.Material;
import physics.geometry.Ray;
import physics.geometry.Vector2D;
import worldEngine.tiles.Tile;
import worldEngine.World;
/**
 * ...
 * @author rje
 */

class WorldPhysicsEngine extends ManagedGrid
{

	public var worldData:WorldData;

	public var tempFeature:Feature;
	
	public var collisionData:Array2D;

	public var collisionOrderX:Array<Int>;
	public var collisionOrderY:Array<Int>;

	public var worldBody:Body;

	public function new(fps : Int, pps : Int, narrowphase:INarrowphase, worldData:WorldData) 
	{
		worldBody = new Body();
		worldBody.MakeStatic();
		
		this.worldData = worldData;

		super(fps,pps,narrowphase,Math.ceil(worldData.worldBounds.width()/worldData.worldCellSize), Math.ceil(worldData.worldBounds.height()/worldData.worldCellSize), worldData.worldCellSize);

		tempFeature = new Feature(worldBody, null, new Material());
		tempFeature.position = new Vector2D();

		collisionData = worldData.collisionData;

		collisionOrderX = [0,-1,1];
		collisionOrderY = [2,1,0,-1,-2];
	}
	
   	override public function Collide() {
   		super.Collide();
        for (cell in grid.data) {        
            for (i in 0...cell.dynamicItems.length) {
           		var body = cell.dynamicItems[i];
				for (bodyFeature in body.features) {
					
					// var cx = world.worldData.Index(body.position.x);
					// var cy = world.worldData.Index(body.position.y);
					// js.Lib.debug();
					var cx = worldData.Index( ((bodyFeature.shape.aabb.r+bodyFeature.shape.aabb.l)/2) + body.position.x);
					var cy = worldData.Index( ((bodyFeature.shape.aabb.b+bodyFeature.shape.aabb.t)/2) + body.position.y);

					for ( y in collisionOrderY ) {
						for( x in collisionOrderX ) {	
							// trace(cx+x,cy+y);
							var tileID = collisionData.get(cx+x,cy+y);
							if (tileID>0) {
								tempFeature.shape = worldData.tileFactory.tiles[tileID];
								tempFeature.position.setTo((cx+x)*worldData.tileSize,(cy+y)*worldData.tileSize);
								narrowphase.CollideFeatures(tempFeature, bodyFeature);
							}
							// tileFeature = world.GetGridSafe(x, y);
							// if (tileFeature.HasFlagBool(TileFeature.COLLIDABLE)) {
							// 	tempFeature.shape = tileFeature.tile;
							// 	tempFeature.position.setTo(x*world.worldData.tileSize,y*world.worldData.tileSize);
							// 	manager.narrowphase.CollideFeatures(tempFeature, bodyFeature);
							// }
						}
					}			
				}  
            }
        }
        // js.Lib.debug();
    }

    override public function CastRay(ray : Ray) : Vector2D {
		//Setup position vars

		var x:Int = worldData.Index(ray.origin.x);
		var y:Int = worldData.Index(ray.origin.y);
		//var x : Int = Int(ray.origin.x / worldData.tileSize);
		//var y : Int = Int(ray.origin.y / worldData.tileSize);
		var cpos_x:Int = x * worldData.tileSize;
		var cpos_y:Int = y * worldData.tileSize;
		
		var d : Vector2D = ray.direction;

		var p_x:Float = ray.origin.x;
		var p_y:Float = ray.origin.y;
		var op_x:Float = ray.origin.x;
		var op_y:Float = ray.origin.y;

		var flipFlop : Bool = true;
		var transitionEdge : Int = 0;
		var out : Vector2D;

		//Initalize step vars
		var stepX : Int;
		var tMaxX : Float;
		var tDeltaX : Float;
		if (d.x < 0) {
			stepX = -1;
			tMaxX = (cpos_x - ray.origin.x) / d.x;
			tDeltaX = worldData.tileSize / -d.x;
		} else if (0 < d.x) {
			stepX = 1;
			tMaxX = ((cpos_x + worldData.tileSize) - ray.origin.x) / d.x;
			tDeltaX = worldData.tileSize / d.x;
		} else {
			stepX = 0;
			tMaxX = 100000000;
			tDeltaX = 0;
		}
		var stepY : Int;
		var tMaxY : Float;
		var tDeltaY : Float;
		if (d.y < 0) {
			stepY = -1;
			tMaxY = (cpos_y - ray.origin.y) / d.y;
			tDeltaY = worldData.tileSize / -d.y;
		} else if (0 < d.y) {
			stepY = 1;
			tMaxY = ((cpos_y + worldData.tileSize) - ray.origin.y) / d.y;
			tDeltaY = worldData.tileSize / d.y;
		} else {
			stepY = 0;
			tMaxY = 100000000;
			tDeltaY = 0;
		}

		// Get current tile
		//var tileFeature : TileFeature = GetGrid(x, y);
		var tileID = collisionData.get(x,y);
		var tile:Tile;
		//Check it
		if (tileID>0) {
			tile = worldData.tileFactory.tiles[tileID];
			tempFeature.shape = worldData.tileFactory.tiles[tileID];
			tempFeature.position.setTo(cpos_x, cpos_y);
			//fakeTileFeature.position.setTo(cpos_x, cpos_y);

			if (tempFeature.shape.IntersectRay(ray, tempFeature)) {

				out = ray.ClosestIntersectPoint();
				//if (g) {
					//g.lineStyle(2, 0xFF0000);
					//g.moveTo(p_x, p_y);
					//g.lineTo(out.x, out.y);
					//g.drawCircle(out.x, out.y, 4);
				//}
				return out;
			}
		}
		
		//Now loop over them
		while ( true ) {
			//if (g) {
				//(flipFlop) ? g.lineStyle(2, 0x0000FF) : g.lineStyle(2, 0x00FF00) ;
				//flipFlop = !flipFlop;
				//g.drawRect(x * worldData.tileSize, y * worldData.tileSize, worldData.tileSize, worldData.tileSize);
			//}

			if (tMaxX < tMaxY) {
				transitionEdge = (stepX < 0) ? Tile.EDGE_RIGHT : Tile.EDGE_LEFT;
				p_x = ray.origin.x + (tMaxX * d.x);
				p_y = ray.origin.y + (tMaxX * d.y);
				tMaxX = tMaxX + tDeltaX;
				x = x + stepX;
				//tileFeature = (stepX < 0) ? tileFeature.left : tileFeature.right;
			} else {
				transitionEdge = (stepY < 0) ? Tile.EDGE_BOTTOM : Tile.EDGE_TOP;
				p_x = ray.origin.x + (tMaxY * d.x);
				p_y = ray.origin.y + (tMaxY * d.y);
				tMaxY = tMaxY + tDeltaY;
				y = y + stepY;
				//tileFeature = (stepY < 0) ? tileFeature.up : tileFeature.down;
			}
			tileID = collisionData.get(x,y);
			// debug drawing
			//if (g) {
				//g.moveTo(op_x, op_y);
				//g.lineTo(p_x, p_y);
			//}
			
			var distX:Float = p_x - ray.origin.x;
			var distY:Float = p_y - ray.origin.y;
			var currentLen:Float = distX * distX + distY * distY;
			if (currentLen > ray.rangeSqr) {
				//trace("too long");
				ray.ReportResult(null, Math.sqrt(currentLen));
				return null;
			}

			if (tileID>0) {
				tile = worldData.tileFactory.tiles[tileID];
				tempFeature.shape = tile;

				if ( ( (transitionEdge == Tile.EDGE_TOP) && (tile.edgeT == 1) ) || ( (transitionEdge == Tile.EDGE_RIGHT) && (tile.edgeR == 1) ) || ( (transitionEdge == Tile.EDGE_BOTTOM) && (tile.edgeB == 1) ) || ( (transitionEdge == Tile.EDGE_LEFT) && (tile.edgeL == 1) ) ) {
					out = new Vector2D(p_x,p_y);
					ray.ReportResult(tempFeature, Math.sqrt(currentLen));
					//if (g)
						//g.drawCircle(out.x, out.y, 4);
					return out;
				} else {
					tempFeature.position.setTo(x*worldData.tileSize, y*worldData.tileSize);
					if (tempFeature.shape.IntersectRay(ray, tempFeature)) {
						out = ray.ClosestIntersectPoint();
						//if (g) {
							//g.moveTo(op_x, op_y);
							//g.lineTo(out.x, out.y);
							//g.drawCircle(out.x, out.y, 4);
						//}
						return out;
					}
				}
			}

			op_x = p_x;
			op_y = p_y;
		}
		return null;
	}
	
}