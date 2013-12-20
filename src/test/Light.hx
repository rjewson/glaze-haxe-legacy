
package test;

import ds.Array2D;
import js.html.Uint8Array;

class Light 
{

    public var x:Int;
    public var y:Int;
    public var range:Int;
    private var range2:Int;
    public var intensity:Int;
    public var colour:Int;

    public var preRenderedLight:Uint8Array;

    //public var workingCells:Uint32Array;

    public function new(x:Int,y:Int,range:Int=255,intensity:Int=255) {
        this.x=x;
        this.y=y;
        this.range = cast Math.min(255,range);
        this.range2=range*2;
        this.intensity = cast Math.min(255,intensity);
        this.preRenderedLight = new Uint8Array(range2*range2);
        this.colour = 0xFFFFFF;
        calc();
    }

    public function calc() {
        for (ypos in 0...range2) {
            for (xpos in 0...range2) {
                var dX = (ypos - range);
                var dY = (xpos - range);
                var dSQR = dX*dX+dY*dY;
                var cellIntensity:Int = cast intensity*Math.max(0,1 - dSQR/(range*range));
                preRenderedLight[getIndex(xpos,ypos)] = cellIntensity;
                trace(preRenderedLight[getIndex(xpos,ypos)]);
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