
package engine.graphics;

import ds.Grid2D;
import wgr.display.DisplayObjectContainer;
import worldEngine.WorldData;

class StaticLayerDisplayManager 
{

    public var grid:Grid2D<IGameGraphics>;

    public var worldData:WorldData;

    public var layerContainer:DisplayObjectContainer;

    public function new(worldData:WorldData,cellSize:Int) {
        this.worldData = worldData;
        this.grid = new Grid2D<IGameGraphics>( Math.ceil(worldData.worldBounds.width()/cellSize) , Math.ceil(worldData.worldBounds.height()/cellSize) , cellSize);
        hashItems();
    }

    public function hashItems() {
        var data = worldData.tmxMap.getObjectGroup("foreground");
        for (item in data.objects) {
            if (item.gid>=0) {
                var tileSet = worldData.tmxMap.getGidOwner(item.gid);
                var props = tileSet.getPropertiesByGid(item.gid);
                trace(props);
            }
        }
        trace(data);
        //for (item in worldData.staticGraphics) {
            // var x1 = world.Index(bodyFeature.shape.aabb.l+body.position.x);
            // var y1 = world.Index(bodyFeature.shape.aabb.t+body.position.y);
            // var x2 = world.Index(bodyFeature.shape.aabb.r+body.position.x)+1;
            // var y2 = world.Index(bodyFeature.shape.aabb.b+body.position.y)+1;
            // for( x in x1...x2 ) {
            //     for ( y in y1...y2 ) {
            //         tileFeature = world.GetGridSafe(x, y);
            //         if (tileFeature.HasFlagBool(TileFeature.COLLIDABLE)) {
            //             tempFeature.shape = tileFeature.tile;
            //             tempFeature.position.setTo(x*world.cellSize,y*world.cellSize);
            //             manager.narrowphase.CollideFeatures(tempFeature, bodyFeature);
            //         }
            //     }
            // }           
        //}
    }

    public function update(viewport:wgr.geom.AABB) {

    }

}