
package engine.map;

import ds.Array2D;
import haxe.ds.IntMap;
import js.html.ArrayBuffer;
import js.html.Uint8Array;

class Map 
{

    public var tiles:IntMap<Float>;
    public var mapData:Array2D;

    public function new(w:Int,h:Int,data:ArrayBuffer) {
        this.mapData = new Array2D(w,h,data);
        this.tiles = new IntMap<Float>();
    }

    public function addTileType(index:Int,x:Int,y:Int) {
        var v:Float = 0xFF << 24 | 0 << 16 | y << 8 | x;
        tiles.set(index,v);
    }

    public function toTexture():Array2D {
        var textureData = new ds.Array2D(mapData.w,mapData.h);
        for (xp in 0...mapData.w) {
             for (yp in 0...mapData.h) {
                var source = mapData.get(xp,yp);
                if (source>0) {
                    trace(xp,yp,source);
                    textureData.set(xp,yp,tiles.get(source)); //0xFF000600 = 5,0
                } else {
                    textureData.set(xp,yp,0xFFFFFFFF);
                }
             }
        }
        return textureData;
    }

}