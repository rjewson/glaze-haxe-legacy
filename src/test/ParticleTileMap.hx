
package test;

import ds.Array2D;
import physics.geometry.Vector2D;
import test.Light;
import test.Sector;
import test.ShadowCast;
import wgr.renderers.webgl.PointSpriteRenderer;

class ParticleTileMap 
{

    public var map:Array2D;
    public var lightMap:Array2D;
    public var tileSize:Int;
    public var renderer:PointSpriteRenderer;

    public var width:Int;
    public var height:Int;

    public var lights:Array<Light>;

    public var count:Int;

    public var shadowCaster:ShadowCast;

    public var test:Vector2D;

    public var visited:Dynamic;

    public var lightSector:Sector;
    public var incomingA:Sector;
    public var incomingB:Sector;

    public function new() {
        this.width = 50;
        this.height = 40;
        this.map = new Array2D(this.width,this.height);
        this.lightMap = new Array2D(this.width,this.height);
        this.tileSize = 16;
        this.test = new Vector2D();
        this.renderer = new PointSpriteRenderer();
        this.renderer.ResizeBatch(width*height);
        this.lights = new Array<Light>();
        this.lights.push(new Light(25,5,400));
        this.lights.push(new Light(20,9,200));
        this.lights.push(new Light(30,30,255));
        this.lights.push(new Light(60,18,255));
        this.lights.push(new Light(5,40,255));
        shadowCaster=new ShadowCast(this);
        count=0;
        this.lightSector = new Sector();
        this.incomingA = new Sector();
        this.incomingB = new Sector();

        InitMap();
    }

    public function InitMap() {
       for (y in 0...height-1) {
            for (x in 0...width-1) {
                var tileType = 77;
                if (x==20||x==30)
                    tileType = 80;
                if (x>20&&x<30)
                    tileType = 0;
                map.set(x,y,tileType);
            }
        }        

        map.set(25,10,80);
        map.set(26,10,80);
        map.set(25,11,80);
        map.set(26,11,80);

    }

    public function draw() {
        count++;
        lights[0].x = Std.int(test.x/16);
        lights[0].y = Std.int(test.y/16);
        reset();
        drawLights();
        drawTiles();
    }

    public function reset() {
        renderer.ResetBatch();        
        for (y in 0...height-1) {
            for (x in 0...width-1) {
                lightMap.set(x,y,0);
            }
        }
    }

    public function drawLights() {
        count = 0;
        for (light in lights) {
            //shadowCaster.drawLight(light);
            visited = {};
            //applyLight(light.x,light.y,light.intensity);
            //applyLight2x(light.x,light.y,light,0);
            AddShadowLight( light.x,light.y,10,0 );
            //castRays(light.x,light.y,10,false);
        }
        //trace(count);
    }

    public function applyLight2(light:Light) {
        lightMap.set(light.x,light.y,256);
        for (i in 1...10) {
            var sideCount = (i*2)+1;
            var xpos = -i;
            var ypos = -i;
            var count = 0;
            var prl = 0;
            while (count<sideCount) {
                prl = light.preRenderedLight.get(10+xpos,10+ypos);
                lightMap.set(light.x+xpos,light.y+ypos,prl);
                xpos++;
                count++;
            }
            count = 1;
            xpos--;
            while (count<sideCount) {
                ypos++;

                var tileOpacity = tileOpacity(map.get(light.x+xpos,light.y+ypos));
                var prevTileOpacity = lightMap.get(light.x+xpos-1,light.y+ypos)>>16;

                var newOpacity = prevTileOpacity+tileOpacity;

                prl = light.preRenderedLight.get(10+xpos,10+ypos);
                prl -= newOpacity;
                if (prl<0) prl=0;
                lightMap.set(light.x+xpos,light.y+ypos,newOpacity<<16|prl);
                count++;
            }
            count = 1;
            while (count<sideCount) {
                xpos--;
                prl = light.preRenderedLight.get(10+xpos,10+ypos);
                lightMap.set(light.x+xpos,light.y+ypos,prl);
                count++;
            }
            count = 1;
            while (count<sideCount) {
                ypos--;
                prl = light.preRenderedLight.get(10+xpos,10+ypos);
                lightMap.set(light.x+xpos,light.y+ypos,prl);
                count++;
            }

        }        
    }

    public function applyLight2x(x:Int,y:Int,light:Light,encounteredWallness:Int) {
        if (x<0||x==width||y<0||y==height) return;
        if (light.x-x<0||light.x-x==20||light.y-y<0||light.y-y==20) return;
        encounteredWallness += tileOpacity(map.get(x,y));
        var newLight = light.preRenderedLight.get(light.x-x, light.y-y)-encounteredWallness;
        
        var currentLight = lightMap.get(x,y);
        if (newLight<=currentLight) return;

        lightMap.set(x,y,256);

        applyLight2x(x+1, y, light, encounteredWallness);
        applyLight2x(x, y+1, light, encounteredWallness);
        applyLight2x(x-1, y, light, encounteredWallness);
        applyLight2x(x, y-1, light, encounteredWallness);

    }

    // public function applyLight(x:Int,y:Int,lastLight:Float) {
    //     count++;
    //     if (x<0||x==width||y<0||y==height) return;
    //     var newLight = lastLight - tileOpacity(map.get(x,y));
    //     var currentLight = lightMap.get(x,y);
    //     if (newLight<=currentLight) return;
    //     lightMap.set(x,y,newLight);
    //     applyLight(x+1,y,newLight);
    //     applyLight(x,y+1,newLight);
    //     applyLight(x-1,y,newLight);
    //     applyLight(x,y-1,newLight);
    // }

    public function applyLight(x:Int,y:Int,lastLight:Float) {
        count++;
        if (x<0||x==width||y<0||y==height) return;
        untyped if (visited[x<<8|y]!=null) return;
        untyped visited[x<<8|y]=true;
        var newLight = lastLight - tileOpacity(map.get(x,y));
        var currentLight = lightMap.get(x,y);
        if (newLight<=currentLight) return;
        lightMap.set(x,y,newLight);
        applyLight(x+1,y,newLight);
        applyLight(x,y+1,newLight);
        applyLight(x-1,y,newLight);
        applyLight(x,y-1,newLight);
    }


    public function AddShadowLight(x:Int,y:Int,range:Int,colour:Int) {
        var minx:Int = cast Math.max(0, x - range);
        var maxx:Int = cast Math.min(width-1, x + range);
        var miny:Int = cast Math.max(0, y - range);
        var maxy:Int = cast Math.min(height-1, y + range);

        var px:Int = Math.ceil(x) - 1;
        var py:Int = Math.ceil(y) - 1;
        var maxi:Int = Math.ceil( range*1.41421356237);

        for (i in 0...maxi) {
            var j:Int = cast Math.max(0, i-range);
            while (j <= i && j <= range) {
                updateOcclusion(px-i+j, py-j, x, y, true);
                updateOcclusion(px-i+j, py+j, x, y, true);
                j++;
            }
        }
 
        for (i in 0...maxi) {
            var j:Int = cast Math.max(0, i-range);
            while (j <= i && j <= range) {
                updateOcclusion(px+j, py-i+j, x,y, false);
                updateOcclusion(px-j+i, py+j, x,y, false);
                j++;
            }
        }

    }    

    public function updateOcclusion(x:Int,y:Int,lightX:Int,lightY:Int,normalize:Bool) {
        if(x >= 0 && x < width && y >= 0 && y < height) {
            var dX = x-lightX;
            var dY = y-lightY;
            var dSQR = dX*dX+dY*dY;
            var intensity = Math.max(0,1 - dSQR/(10*10));
            var currentLight = lightMap.get(x,y);
            var newLight = 256*intensity;
            if (newLight<=currentLight) return;
            lightMap.set(x,y,256*intensity);      
            calcOcclusion(x,y,false);      
        }
    }

    public function calcOcclusion(x:Int,y:Int,normalize:Bool) {
        var dx:Int = Math.ceil(x) - x - 1;
        var dy:Int = Math.ceil(y) - y - 1;                  
        //sign of vector components
        var sx:Float = (dx == 0) ? 0 : (dx < 0) ? -1 : 1;
        var sy:Float = (dy == 0) ? 0 : (dy < 0) ? -1 : 1;
        //offset necessary for vertical/horizontal lines
        var ox:Float = (sy == 0) ? sx : 0;
        var oy:Float = (sx == 0) ? sy : 0;
        //calculate the points that define the sector
        var x1:Float = x + 0.5 * (1 - sy + ox);
        var y1:Float = y + 0.5 * (1 + sx + oy);
        var x2:Float = x + 0.5 * (1 + sy + ox);
        var y2:Float = y + 0.5 * (1 - sx + oy);
        //trace(x,y,x1,y1,x2,y2);
    }

    // public function updateOcclusion(x:Int,y:Int,lightX:Int,lightY:Int,normalize:Bool) {
    //     if(x >= 0 && x < width && y >= 0 && y < height) {
    //         lightMap.set(x,y,256);            
    //     }
    // }


    public function castRays(x:Int,y:Int, range:Float, allowDiagonalSteps:Bool) {
        var rCeil:Int = Math.ceil(range);
        var dx:Int = -rCeil;
        var dy:Int = -rCeil;
        while (dx < rCeil)
            castRay(x,y, range, dx++, dy, allowDiagonalSteps);
        while (dy < rCeil)
            castRay(x,y, range, dx, dy++, allowDiagonalSteps);
        while (dx > -rCeil)
            castRay(x,y, range, dx--, dy, allowDiagonalSteps);
        while (dy > -rCeil)
            castRay(x,y, range, dx, dy--, allowDiagonalSteps);
    }

    public function castRay(x:Int,y:Int, range:Float, dirX:Int, dirY:Int, allowDiagonalSteps:Bool):Bool {
        var rCeil:Int = Math.ceil(range);
        
        var dx:Int = cast Math.abs(dirX);
        var dy:Int = cast Math.abs(dirY);
        var sx:Int = (dirX > 0) ? 1 : -1; //sign
        var sy:Int = (dirY > 0) ? 1 : -1; //sign
        var err:Int = dx - dy;
        var xSum:Int = 0;
        var ySum:Int = 0;
        
        var light:Float = 256;

        //move startX, startY to targetX, targetY
        while (true)
        {
            //max range reached?
            if (xSum * xSum + ySum * ySum >= range * range)
                break;
            
            //check for collsion
            // var ld:Float = light - tileOpacity(map.get(x,y)); //TODO: optimize - avoid function call
            // var currentLight = lightMap.get(x,y);
            // if (ld<=currentLight) 
            //     lightMap.set(x,y,light);
            // light=ld;

// if (light <= 0)
//     return false;    
// lightMap.set(x,y,light);
// light-=tileOpacity(map.get(x,y));
            lightMap.set(x,y,light);
            if (tileOpacity(map.get(x,y))>99) 
                return false;
            // lightMap.set(x,y,light);

            light-=15;
            var e2:Int = (2 * err);
            if(allowDiagonalSteps == false) {
                if (e2 > -dy && Math.abs(e2 + dy) > Math.abs(e2 - dx)) {
                    xSum++;
                    err -= dy;
                    x += sx;
                } else if (e2 < dx) {
                    ySum++;
                    err += dx;
                    y += sy;
                }                   
            } else {
                if (e2 > -dy) {
                    xSum++;
                    err -= dy;
                    x += sx;
                }
                if (e2 < dx) {
                    ySum++;
                    err += dx;
                    y += sy;
                }
            }
        }
        return true;
    }


    public function drawTiles() {
        for (y in 0...height-1) {
            for (x in 0...width-1) {
                var tile = map.get(x,y);
                if (tile>0) {
                    var light = lightMap.get(x,y) & 0xFFFF;
                    renderer.AddSpriteToBatch(tile,x*tileSize,y*tileSize,16,0xFF,light,light,light);                    
                }
            }
        }
    }

    inline public function tileOpacity(id:Int) {
        if (id==80) return 100;
        if (id==77) return 15;
        return 5;
    }

}       