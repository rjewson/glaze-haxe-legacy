package worldEngine;
import worldEngine.WorldData;
import worldEngine.tiles.Tile;
import worldEngine.tiles.TileFeature;
import physics.dynamics.Body;
import physics.dynamics.Feature;
import physics.dynamics.Material;
import physics.geometry.AABB;
import physics.geometry.Ray;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class World
{
	
	public var worldData:WorldData;
	
	public var worldBody:Body;
	
	public var fakeTileFeature : Feature;

	public function new(worldData:WorldData) 
	{
		this.worldData = worldData;
		
		worldBody = new Body();
		worldBody.MakeStatic();
		
		// fakeTileFeature = new Feature(worldBody, null, Material.DEFAULTMATERIAL);
		// fakeTileFeature.position = new Vector2D();
		
	}

	// public function VisibleArea(tileBoundary:Int):AABB {
	// 	return new AABB(tileBoundary * worldData.tileSize, (worldData.height - tileBoundary) * worldData.tileSize, (worldData.width - tileBoundary) * worldData.tileSize, tileBoundary * worldData.tileSize);
	// }

	

	public function Collide(body:Body):Void {

	}

	// public function CastRay(ray : Ray) : Vector2D {
	// 	//Setup position vars

	// 	var x:Int = Index(ray.origin.x);
	// 	var y:Int = Index(ray.origin.y);
	// 	//var x : Int = Int(ray.origin.x / cellSize);
	// 	//var y : Int = Int(ray.origin.y / cellSize);
	// 	var cpos_x:Int = x * cellSize;
	// 	var cpos_y:Int = y * cellSize;
		
	// 	var d : Vector2D = ray.direction;

	// 	var p_x:Float = ray.origin.x;
	// 	var p_y:Float = ray.origin.y;
	// 	var op_x:Float = ray.origin.x;
	// 	var op_y:Float = ray.origin.y;

	// 	var flipFlop : Bool = true;
	// 	var transitionEdge : Int = 0;
	// 	var out : Vector2D;

	// 	//Initalize step vars
	// 	var stepX : Int;
	// 	var tMaxX : Float;
	// 	var tDeltaX : Float;
	// 	if (d.x < 0) {
	// 		stepX = -1;
	// 		tMaxX = (cpos_x - ray.origin.x) / d.x;
	// 		tDeltaX = cellSize / -d.x;
	// 	} else if (0 < d.x) {
	// 		stepX = 1;
	// 		tMaxX = ((cpos_x + cellSize) - ray.origin.x) / d.x;
	// 		tDeltaX = cellSize / d.x;
	// 	} else {
	// 		stepX = 0;
	// 		tMaxX = 100000000;
	// 		tDeltaX = 0;
	// 	}
	// 	var stepY : Int;
	// 	var tMaxY : Float;
	// 	var tDeltaY : Float;
	// 	if (d.y < 0) {
	// 		stepY = -1;
	// 		tMaxY = (cpos_y - ray.origin.y) / d.y;
	// 		tDeltaY = cellSize / -d.y;
	// 	} else if (0 < d.y) {
	// 		stepY = 1;
	// 		tMaxY = ((cpos_y + cellSize) - ray.origin.y) / d.y;
	// 		tDeltaY = cellSize / d.y;
	// 	} else {
	// 		stepY = 0;
	// 		tMaxY = 100000000;
	// 		tDeltaY = 0;
	// 	}

	// 	// Get current tile
	// 	var tileFeature : TileFeature = GetGrid(x, y);
	// 	//Check it
	// 	if (tileFeature.HasFlagBool(TileFeature.COLLIDABLE)) {
	// 		fakeTileFeature.position.setTo(cpos_x, cpos_y);
	// 		if (tileFeature.tile.IntersectRay(ray, fakeTileFeature)) {
	// 			out = ray.ClosestIntersectPoint();
	// 			//if (g) {
	// 				//g.lineStyle(2, 0xFF0000);
	// 				//g.moveTo(p_x, p_y);
	// 				//g.lineTo(out.x, out.y);
	// 				//g.drawCircle(out.x, out.y, 4);
	// 			//}
	// 			return out;
	// 		}
	// 	}
		
	// 	//Now loop over them
	// 	while ( tileFeature!=null ) {
	// 		//if (g) {
	// 			//(flipFlop) ? g.lineStyle(2, 0x0000FF) : g.lineStyle(2, 0x00FF00) ;
	// 			//flipFlop = !flipFlop;
	// 			//g.drawRect(x * cellSize, y * cellSize, cellSize, cellSize);
	// 		//}

	// 		if (tMaxX < tMaxY) {
	// 			transitionEdge = (stepX < 0) ? Tile.EDGE_RIGHT : Tile.EDGE_LEFT;
	// 			p_x = ray.origin.x + (tMaxX * d.x);
	// 			p_y = ray.origin.y + (tMaxX * d.y);
	// 			tMaxX = tMaxX + tDeltaX;
	// 			x = x + stepX;
	// 			//tileFeature = (stepX < 0) ? tileFeature.left : tileFeature.right;
	// 		} else {
	// 			transitionEdge = (stepY < 0) ? Tile.EDGE_BOTTOM : Tile.EDGE_TOP;
	// 			p_x = ray.origin.x + (tMaxY * d.x);
	// 			p_y = ray.origin.y + (tMaxY * d.y);
	// 			tMaxY = tMaxY + tDeltaY;
	// 			y = y + stepY;
	// 			//tileFeature = (stepY < 0) ? tileFeature.up : tileFeature.down;
	// 		}
	// 		tileFeature = GetGrid(x, y);
	// 		// debug drawing
	// 		//if (g) {
	// 			//g.moveTo(op_x, op_y);
	// 			//g.lineTo(p_x, p_y);
	// 		//}
			
	// 		var distX:Float = p_x - ray.origin.x;
	// 		var distY:Float = p_y - ray.origin.y;
	// 		var currentLen:Float = distX * distX + distY * distY;
	// 		if (currentLen > ray.rangeSqr) {
	// 			//trace("too long");
	// 			ray.ReportResult(null, Math.sqrt(currentLen));
	// 			return null;
	// 		}

	// 		if (tileFeature!=null && tileFeature.HasFlagBool(TileFeature.COLLIDABLE)) {
	// 			if ( ( (transitionEdge == Tile.EDGE_TOP) && (tileFeature.tile.edgeT == 1) ) || ( (transitionEdge == Tile.EDGE_RIGHT) && (tileFeature.tile.edgeR == 1) ) || ( (transitionEdge == Tile.EDGE_BOTTOM) && (tileFeature.tile.edgeB == 1) ) || ( (transitionEdge == Tile.EDGE_LEFT) && (tileFeature.tile.edgeL == 1) ) ) {
	// 				out = new Vector2D(p_x,p_y);
	// 				ray.ReportResult(fakeTileFeature, Math.sqrt(currentLen));
	// 				//if (g)
	// 					//g.drawCircle(out.x, out.y, 4);
	// 				return out;
	// 			} else {
	// 				fakeTileFeature.position.setTo(x*cellSize, y*cellSize);
	// 				if (tileFeature.tile.IntersectRay(ray, fakeTileFeature)) {
	// 					out = ray.ClosestIntersectPoint();
	// 					//if (g) {
	// 						//g.moveTo(op_x, op_y);
	// 						//g.lineTo(out.x, out.y);
	// 						//g.drawCircle(out.x, out.y, 4);
	// 					//}
	// 					return out;
	// 				}
	// 			}
	// 		}

	// 		op_x = p_x;
	// 		op_y = p_y;
	// 	}
	// 	return null;
	// }
	
}