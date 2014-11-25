package worldEngine;
import ds.Array2D;
import engine.graphics.IGameGraphics;
import engine.map.tmx.TmxMap;
import worldEngine.tiles.TileFactory;

/**
 * ...
 * @author rje
 */

class WorldData 
{

	// public var width : Int;
	// public var height : Int;
	public var tileSize : Int;
	public var invTileSize : Float;
	public var worldCellSize : Int;
	
	public var tmxMap:TmxMap;
	public var tileFactory:TileFactory;
	public var collisionData:Array2D;

	public var staticGraphics:Array<IGameGraphics>;

	public var worldBounds:physics.geometry.AABB;
		
	public function new(tileSize:Int,tmxMap:TmxMap,collisionLayerName:String) 
	{
		this.tileSize = tileSize;
		this.invTileSize = 1/tileSize;
		this.tmxMap = tmxMap;
		tileFactory = new TileFactory();
		collisionData = engine.map.tmx.TmxLayer.layerToCollisionMap(tmxMap.getLayer(collisionLayerName));
		
		worldBounds = new physics.geometry.AABB(0,collisionData.h*tileSize,collisionData.w*tileSize,0);
		worldCellSize = cast worldBounds.width();
	}
	
	public function InitalizeWorld():Void {
		ProcessTiles();
		ProcessObjects();
		ProcessWayPoints();
	}

	
	inline public function Index(value:Float):Int {
		//FIXME Not sure this always works...
		//return Std.int(value / cellSize);
		//return Math.floor(value * invTileSize);
		return Std.int(value * invTileSize);
	}

	public function ProcessTiles():Void {
		// for (y in 0...height) {
		// 	for (x in 0...width) {
				//var centre = world.GetGridSafe(x, y);
				//centre.SetEdgeData(world.GetGridSafe(x-1, y), world.GetGridSafe(x, y-1), world.GetGridSafe(x+1, y), world.GetGridSafe(x, y+1));
		// 	}
		// }
	}

	public function ProcessObjects():Void {
		
	}
	
	public function ProcessWayPoints():Void {
		
	}

}