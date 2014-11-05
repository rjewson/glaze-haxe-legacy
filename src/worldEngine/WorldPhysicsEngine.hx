package worldEngine;

import ds.Array2D;
import physics.collision.broadphase.managedgrid.ManagedGrid;
import physics.collision.narrowphase.INarrowphase;
import physics.dynamics.Feature;
import physics.dynamics.Material;
import physics.geometry.Vector2D;
import worldEngine.World;

/**
 * ...
 * @author rje
 */

class WorldPhysicsEngine extends ManagedGrid
{

	public var world:World;

	public var tempFeature:Feature;
	
	public var collisionData:Array2D;

	public function new(fps : Int, pps : Int, narrowphase:INarrowphase, world:World) 
	{
		this.world = world;
		super(fps,pps,narrowphase,Std.int(world.worldData.width / world.worldData.worldCellSize), Std.int(world.worldData.height / world.worldData.worldCellSize), world.worldData.worldCellSize);

		tempFeature = new Feature(world.worldBody, null, new Material());
		tempFeature.position = new Vector2D();

		collisionData = world.worldData.collisionData;
	}
	
   	override public function Collide() {
   		super.Collide();
        for (cell in grid.data) {        
            for (i in 0...cell.dynamicItems.length) {
           		var body = cell.dynamicItems[i];
				for (bodyFeature in body.features) {
					var x1 = world.worldData.Index(bodyFeature.shape.aabb.l+body.position.x+0.5)-1;
					var y1 = world.worldData.Index(bodyFeature.shape.aabb.t+body.position.y+0.5)-1;
					var x2 = world.worldData.Index(bodyFeature.shape.aabb.r+body.position.x-0.5)+1;
					var y2 = world.worldData.Index(bodyFeature.shape.aabb.b+body.position.y-0.5)+1;
					for( x in x1...x2 ) {
						for ( y in y1...y2 ) {
							var tileID = collisionData.get(x,y);
							if (tileID>0) {
								tempFeature.shape = world.worldData.tileFactory.tiles[tileID];
								tempFeature.position.setTo(x*world.worldData.tileSize,y*world.worldData.tileSize);
								narrowphase.CollideFeatures(tempFeature, bodyFeature);
							}
							// tileFeature = world.GetGridSafe(x, y);
							// if (tileFeature.HasFlagBool(TileFeature.COLLIDABLE)) {
							// 	tempFeature.shape = tileFeature.tile;
							// 	tempFeature.position.setTo(x*world.cellSize,y*world.cellSize);
							// 	manager.narrowphase.CollideFeatures(tempFeature, bodyFeature);
							// }
						}
					}			
				}  
            }
        }
    }
	
}