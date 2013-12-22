
package wgr.lighting;

import ds.Array2D;
import js.html.Uint32Array;
import js.html.Uint8Array;

class FloodFillLight implements ILight
{

    public var x:Int;
    public var y:Int;
    public var range:Int;
    private var range2:Int;
    public var intensity:Int;
    public var colour:Int;

    public var preRenderedLight:Uint8Array;
    public var renderedLight:Uint8Array;
    public var workingCells:Uint32Array;

    public function new(x:Int,y:Int,range:Int=255,intensity:Int=255) {
        this.x=x;
        this.y=y;
        this.range = cast Math.min(255,range);
        this.range2=range*2;
        this.intensity = cast Math.min(255,intensity);
        this.preRenderedLight = new Uint8Array(range2*range2);
        this.renderedLight = new Uint8Array(range2*range2);
        this.workingCells = new Uint32Array(range2*range2);
        this.colour = 0xFFFFFF;
        preRenderLight();
    }

    public function preRenderLight() {
        for (ypos in 0...range2) {
            for (xpos in 0...range2) {
                var dX = (ypos - range);
                var dY = (xpos - range);
                var dSQR = dX*dX+dY*dY;
                var cellIntensity:Int = cast intensity*Math.max(0,1 - dSQR/(range*range));
                preRenderedLight[getIndex(xpos,ypos)] = cellIntensity;
                // trace(preRenderedLight[getIndex(xpos,ypos)]);
            }
        }
    }

    public function resetRenderedLight() {
        for (y in 0...range2) {
            for (x in 0...range2) {
                renderedLight[getIndex(x,y)] = 0;
            }
        }
    }

    public function renderLight(map:Array2D,opacityLookup:Uint8Array,lightMap:Array2D) {
        var cellX:Int=x;
        var cellY:Int=y;
        var encounteredWallness:Int=0;
        var cellCount = 0;
        workingCells[cellCount++] = 0<<16 | cellX<<8 | cellY;
        while (cellCount>0) {

            var cellValue = workingCells[--cellCount];
            encounteredWallness = (cellValue >> 16) & 0xFF;
            cellX = (cellValue >> 8) & 0xFF;
            cellY = cellValue & 0xFF;

            if (cellX>=0&&x<map.w&&cellY>=0&&y<map.h) { //Still in the map?
                
                var relX:Int = x-cellX+range;
                var relY:Int = y-cellY+range;
                if (relX>=0||relX<range2||relY>=0||relY<=range2) { //In the light range?

                    encounteredWallness += opacityLookup[map.get(cellX,cellY)];
                    //var newLight = getRelativeLight(x-cellX, y-cellY)-encounteredWallness;
                    var newLight = preRenderedLight[getIndex(relX,relY)]-encounteredWallness;

                    var currentLight = lightMap.get(cellX,cellY);

                    if (newLight>currentLight){//} && newLight>=0 && encounteredWallness>=0) {
                        // renderedLight[getIndex(x-cellX, y-cellY)] = newLight;
                        lightMap.set(cellX,cellY,newLight);

                        workingCells[cellCount++] = encounteredWallness<<16 | cellX+1<<8 | cellY;
                        workingCells[cellCount++] = encounteredWallness<<16 | cellX<<8   | cellY+1;
                        workingCells[cellCount++] = encounteredWallness<<16 | cellX-1<<8 | cellY;
                        workingCells[cellCount++] = encounteredWallness<<16 | cellX<<8   | cellY-1;
                    }
                }
            }

        }
    }

    public function getRelativeLight(rx:Int,ry:Int):Int {
        rx+=range;
        ry+=range;
        if (rx<0||rx>range2-1||ry<0||ry>range2-1) return 0;
        return preRenderedLight[getIndex(rx,ry)];
    }

    inline public function getIndex(x:Int, y:Int):Int {
        return y * range2 + x;
    }

}