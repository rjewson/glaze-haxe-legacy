
package ds;

import js.html.ArrayBuffer;
import js.html.Uint32Array;
import js.html.Uint8Array;
import physics.geometry.Vector2D;

class Array2D 
{

    public var w:Int;
    public var h:Int;

    public var buffer:ArrayBuffer;
    public var data32:Uint32Array;
    public var data8:Uint8Array;


    public function new(width:Int,height:Int,buffer:ArrayBuffer=null) {
        w = width;
        h = height;

        if (buffer==null)
            this.buffer = new ArrayBuffer(w*h*4);
        else
            this.buffer = buffer;
        data32 = new Uint32Array(this.buffer);
        data8 = new Uint8Array(this.buffer);
    }

    inline public function get(x:Int, y:Int):Int {
        return data32[getIndex(x,y)];
    }

    inline public function set(x:Int, y:Int, v:Dynamic) {
        data32[getIndex(x,y)] = v;
    }

    inline public function getIndex(x:Int, y:Int):Int {
        return y * w + x;
    }

    public function castRay( p1Original:Vector2D, p2Original:Vector2D, tileSize:Int = 16 ):Vector2D {
        //INITIALISE//////////////////////////////////////////
        // p2Original.plusEquals(p1Original);
        // p1Original.plusEquals2(0.5,0.5);
        // p2Original.plusEquals2(0.5,0.5);
        // p1Original.multEquals(16);
        // p2Original.multEquals(16);

        // normalise the points
        var p1:Vector2D = new Vector2D( p1Original.x / tileSize, p1Original.y / tileSize);
        var p2:Vector2D = new Vector2D( p2Original.x / tileSize, p2Original.y / tileSize);
    
        if ( Std.int( p1.x ) == Std.int( p2.x ) && Std.int( p1.y ) == Std.int( p2.y ) ) {
            //since it doesn't cross any boundaries, there can't be a collision
            return p2Original;
        }
        
        //find out which direction to step, on each axis
        var stepX:Int = ( p2.x > p1.x ) ? 1 : -1;  
        var stepY:Int = ( p2.y > p1.y ) ? 1 : -1;
    
        var rayDirection:Vector2D = new Vector2D( p2.x - p1.x, p2.y - p1.y );
    
        //find out how far to move on each axis for every whole integer step on the other
        var ratioX:Float = rayDirection.x / rayDirection.y;
        var ratioY:Float = rayDirection.y / rayDirection.x;
    
        var deltaY:Float = p2.x - p1.x;
        var deltaX:Float = p2.y - p1.y;
        //faster than Math.abs()...
        deltaX = deltaX < 0 ? -deltaX : deltaX;
        deltaY = deltaY < 0 ? -deltaY : deltaY;
    
        //initialise the integer test coordinates with the coordinates of the starting tile, in tile space ( integer )
        //Note: using noralised version of p1
        var testX:Int = Std.int(p1.x); 
        var testY:Int = Std.int(p1.y);
    
        //initialise the non-integer step, by advancing to the next tile boundary / ( whole integer of opposing axis )
        //if moving in positive direction, move to end of curent tile, otherwise the beginning
        var maxX:Float = deltaX * ( ( stepX > 0 ) ? ( 1.0 - (p1.x % 1) ) : (p1.x % 1) ); 
        var maxY:Float = deltaY * ( ( stepY > 0 ) ? ( 1.0 - (p1.y % 1) ) : (p1.y % 1) );
    
        var endTileX:Int = Std.int(p2.x);
        var endTileY:Int = Std.int(p2.y);
        
        //TRAVERSE//////////////////////////////////////////
    
        var hit:Bool;
        var collisionPoint:Vector2D = new Vector2D();

        while( testX != endTileX || testY != endTileY ) {

            if (  maxX < maxY ) {
                maxX += deltaX;
                testX += stepX;
                var data = get( testX, testY );
                if ( data != 0 ) {
                    collisionPoint.x = testX;
                    if ( stepX < 0 ) collisionPoint.x += 1.0; //add one if going left
                    collisionPoint.y = p1.y + ratioY * ( collisionPoint.x - p1.x);  
                    collisionPoint.x *= tileSize;//scale up
                    collisionPoint.y *= tileSize;
                    return collisionPoint;
                }
            } else {
                maxY += deltaY;
                testY += stepY;
                var data = get( testX, testY );
                if ( data != 0 ) {
                    collisionPoint.y = testY;
                    if ( stepY < 0 ) collisionPoint.y += 1.0; //add one if going up
                    collisionPoint.x = p1.x + ratioX * ( collisionPoint.y - p1.y);
                    collisionPoint.x *= tileSize;//scale up
                    collisionPoint.y *= tileSize;
                    return collisionPoint;
                }
            }
    
        }
        //no intersection found, just return end point:
        return p2Original;
    }

}