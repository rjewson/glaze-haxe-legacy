
package test;

import ds.Array2D;

class Light 
{

    public var x:Int;
    public var y:Int;
    public var intensity:Int;

    public var preRenderedLight:Array2D;

    public function new(x:Int,y:Int,intensity:Int) {
        this.x=x;
        this.y=y;
        this.intensity=intensity;
        this.preRenderedLight = new Array2D(20,20);
        calc();
    }

    public function calc() {


        for (ypos in 0...20) {
            for (xpos in 0...20) {
                var ydist = (ypos - 10);
                var xdist = (xpos - 10);
                var light = Math.sqrt(ydist*ydist+xdist*xdist);
                light  = (1/light)*1000;
                trace(xpos,ypos,light);
                preRenderedLight.set(xpos,ypos,light);
            }
        }
    }

}