
package test;

import ds.Array2D;
import physics.geometry.Vector2D;
import test.Light;
import test.ParticleTileMap;

class ShadowCast 
{

    public var map:ParticleTileMap;

    public var position:Vector2D;

    public var gradient:Bool;

    public var mult:Array<Array<Int>>;

    public var count:Int;

    public function new(map:ParticleTileMap) {
        this.map = map;
        this.mult = new Array<Array<Int>>();
        this.position = new Vector2D();
        this.mult.push([1,  0,  0, -1, -1,  0,  0,  1]);
        this.mult.push([0,  1, -1,  0,  0, -1,  1,  0]);
        this.mult.push([0,  1,  1,  0,  0, -1, -1,  0]);
        this.mult.push([1,  0,  0,  1, -1,  0,  0, -1]);
        this.gradient = true;
    }

    public function calculateOctant(cx:Float, cy:Float, row:Int, start:Float, end:Float, radius:Int, xx:Int, xy:Int, yx:Int, yy:Int, id:Int) {
        count++;
        setTileLight(cx,cy,0);
        var new_start:Float = 0;
        if (start<end)
            return;
        var radius_squared:Int = Std.int(radius * radius);
        for (i in row...radius+1) {
            var dx = -i-1;
            var dy = -i;
            var blocked = false;
            while(dx <= 0) {
 
                dx += 1;
                
                var X = cx + dx * xx + dy * xy;
                var Y = cy + dx * yx + dy * yy;
    
                if(X < map.width && X >= 0 && Y < map.height && Y >=0) {
                
                    var l_slope = (dx-0.5)/(dy+0.5);
                    var r_slope = (dx+0.5)/(dy-0.5);
                    
                    if(start < r_slope) {
                        continue;
                    } else if( end > l_slope) {
                        break;
                    } else {
                        if(dx*dx + dy*dy < radius_squared) {
                            var pos1 = new Vector2D(X, Y);
                            var pos2 = position;
                            var d = (pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.y - pos2.y) * (pos1.y - pos2.y);
                            setTileLight(X,Y,(gradient == false) ? 1 : (1 - (d / (radius * radius))));
                        } 
                        
                        if(blocked) {
                            if(doesTileBlock(X, Y)) {
                                new_start = r_slope;
                                continue;
                            } else {
                                blocked = false;
                                start = new_start;
                            }
                        } else {
                            if(doesTileBlock(X, Y) && i < radius) {
                                blocked = true;
                                calculateOctant(cx, cy, i+1, start, l_slope, radius, xx, xy, yx, yy, id+1);
                                
                                new_start = r_slope;
                            }
                        }
                    }
                }
            }
            
            if(blocked) break;           
        }
    }

    public function calculate() {
        for (i in 0...8) {
            calculateOctant(position.x,position.y,1,1.0,0.0,10,mult[0][i],mult[1][i],mult[2][i],mult[3][i],0);
            setTileLight(position.x,position.y,1);
        }
    }

    public function setTileLight(x:Float,y:Float,intensity:Float) {
        map.lightMap.set(Std.int(x),Std.int(y),Std.int(intensity*256));
    }

    public function doesTileBlock(x:Float,y:Float):Bool {
        return map.map.get(Std.int(x),Std.int(y))==80;
    }

    public function drawLight(light:Light) {
        count = 0;
        this.position.x = light.x;
        this.position.y = light.y;
        calculate();
        trace(count);
    }

}