package worldEngine;
import worldEngine.tiles.TileFeature;
import haxe.FastList;
import physics.collision.broadphase.action.ActionResultCollection;
import physics.collision.broadphase.action.IBroadphaseAction;
import physics.collision.broadphase.managedgrid.Cell;
import physics.collision.broadphase.managedgrid.ManagedGrid;
import physics.dynamics.Body;
import physics.dynamics.Feature;
import physics.dynamics.Material;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class WorldCell extends Cell
{

	public var world:World;
	public var tempFeature:Feature;
	
	public var renderCellStamp:Bool;
	
	public function new(manager:ManagedGrid,world:World, index:Int, x:Float, y:Float, w:Float, h:Float) 
	{
		this.world = world;
		super(manager, index, x, y, w, h);
		tempFeature = new Feature(world.worldBody, null, Material.DEFAULTMATERIAL);
		tempFeature.position = new Vector2D();
		
	}
	
	inline override public function AdditionalCollide(body:Body):Void {
		if (!IsCoreCell(body)) 
			return;
		var tileFeature:TileFeature;
		for (bodyFeature in body.features) {
			var x1 = world.Index(bodyFeature.shape.aabb.l+body.position.x);
			var y1 = world.Index(bodyFeature.shape.aabb.t+body.position.y);
			var x2 = world.Index(bodyFeature.shape.aabb.r+body.position.x)+1;
			var y2 = world.Index(bodyFeature.shape.aabb.b+body.position.y)+1;
			for( x in x1...x2 ) {
				for ( y in y1...y2 ) {
					tileFeature = world.GetGridSafe(x, y);
					if (tileFeature.HasFlagBool(TileFeature.COLLIDABLE)) {
						tempFeature.shape = tileFeature.tile;
						tempFeature.position.setTo(x*world.cellSize,y*world.cellSize);
						manager.narrowphase.CollideFeatures(tempFeature, bodyFeature);
					}
				}
			}			
		}
	}

}