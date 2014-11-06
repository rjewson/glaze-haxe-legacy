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

	public var collisionOrderX:Array<Int>;
	public var collisionOrderY:Array<Int>;

	public function new(fps : Int, pps : Int, narrowphase:INarrowphase, world:World) 
	{
		this.world = world;
		super(fps,pps,narrowphase,Std.int(world.worldData.width / world.worldData.worldCellSize), Std.int(world.worldData.height / world.worldData.worldCellSize), world.worldData.worldCellSize);

		tempFeature = new Feature(world.worldBody, null, new Material());
		tempFeature.position = new Vector2D();

		collisionData = world.worldData.collisionData;

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
					var cx = world.worldData.Index( ((bodyFeature.shape.aabb.r+bodyFeature.shape.aabb.l)/2) + body.position.x);
					var cy = world.worldData.Index( ((bodyFeature.shape.aabb.b+bodyFeature.shape.aabb.t)/2) + body.position.y);

					for ( y in collisionOrderY ) {
						for( x in collisionOrderX ) {	
							// trace(cx+x,cy+y);
							var tileID = collisionData.get(cx+x,cy+y);
							if (tileID>0) {
								tempFeature.shape = world.worldData.tileFactory.tiles[tileID];
								tempFeature.position.setTo((cx+x)*world.worldData.tileSize,(cy+y)*world.worldData.tileSize);
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
        // js.Lib.debug();
    }
	
}