
package ds;

import js.html.ArrayBuffer;
import js.html.Uint32Array;

class Array2D 
{

    public var w:Int;
    public var h:Int;

    public var buffer:ArrayBuffer;
    public var data:Uint32Array;

    public function new(width:Int,height:Int) {
        w = width;
        h = height;

        buffer = new ArrayBuffer(w*h*4);
        data = new Uint32Array(buffer);
    }

    inline public function get(x:Int, y:Int):Int {
        return data[getIndex(x,y)];
    }

    inline public function getIndex(x:Int, y:Int):Int {
        return y * w + x;
    }

}