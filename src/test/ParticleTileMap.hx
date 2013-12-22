
package test;

import ds.Array2D;
import js.html.ArrayBuffer;
import js.html.Uint32Array;
import js.html.Uint8Array;
import physics.geometry.Vector2D;
import test.Light;
import test.Sector;
import test.ShadowCast;
import wgr.renderers.webgl.PointSpriteLightMapRenderer;

class ParticleTileMap 
{

    public var map:Array2D;
    public var lightMap:Array2D;
    public var tileSize:Int;
    public var renderer:PointSpriteLightMapRenderer;

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

    public var workingCells:Uint32Array;

    public var tileOpacities:Uint8Array;

    public function new() {
        this.width = 50;
        this.height = 40;
        this.map = new Array2D(this.width,this.height);
        this.lightMap = new Array2D(this.width,this.height);
        this.tileSize = 32;
        this.test = new Vector2D();
        this.renderer = new PointSpriteLightMapRenderer();
        this.renderer.ResizeBatch(width*height);
        this.lights = new Array<Light>();
        this.lights.push(new Light(25,5,20,255));
        // this.lights.push(new Light(20,9,200));
        // this.lights.push(new Light(30,30,255));
        // this.lights.push(new Light(60,18,255));
        // this.lights.push(new Light(5,40,255));
        shadowCaster=new ShadowCast(this);
        workingCells = new Uint32Array(new ArrayBuffer(100*100*4));
        tileOpacities = new Uint8Array(256);
        count=0;
        // this.lightSector = new Sector();
        // this.incomingA = new Sector();
        // this.incomingB = new Sector();

        InitMap();
    }

    public function InitMap() {
        var leftWall = 20;
        var rightWall = 30;
       for (y in 0...height-1) {
            for (x in 0...width-1) {
                var tileType = 77;
                if (x==leftWall||x==rightWall)
                    tileType = 80;
                if (x>leftWall&&x<rightWall)
                    tileType = 31;
                map.set(x,y,tileType);
            }
        }        

        map.set(25,10,80);
        map.set(26,10,80);
        map.set(25,11,80);
        map.set(26,11,80);

        for (i in 0...tileOpacities.length) {
            tileOpacities[i] = 1;
        }
        tileOpacities[80] = 40;
        tileOpacities[77] = 30;
        tileOpacities[31] =  5;

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

            light.renderLight(map,tileOpacities,lightMap);
            //applyLight(light);

            //applyLight2x(light.x,light.y,light,0);
            //AddShadowLight( light.x,light.y,10,0 );
            //castRays(light.x,light.y,10,false);
            //castVoxelRays(light.x,light.y,10);

        }
        //trace(count);
    }

    // public function applyLight2x(x:Int,y:Int,light:Light,encounteredWallness:Int) {
    //     if (x<0||x==width||y<0||y==height) return;
    //     if (light.x-x<0||light.x-x==20||light.y-y<0||light.y-y==20) return;
    //     encounteredWallness += tileOpacity(map.get(x,y));
    //     var newLight = light.preRenderedLight.get(light.x-x, light.y-y)-encounteredWallness;
        
    //     var currentLight = lightMap.get(x,y);
    //     if (newLight<=currentLight) return;

    //     lightMap.set(x,y,256);

    //     applyLight2x(x+1, y, light, encounteredWallness);
    //     applyLight2x(x, y+1, light, encounteredWallness);
    //     applyLight2x(x-1, y, light, encounteredWallness);
    //     applyLight2x(x, y-1, light, encounteredWallness);

    // }

    // public function applyLightOrig(x:Int,y:Int,lastLight:Float) {
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

    /*Good!!!*/
    // public function applyLight(x:Int,y:Int,lastLight:Int) {
    //     lastLight = 255;
    //     var cellCount = 0;
    //     workingCells[cellCount++] = lastLight<<16 | x<<8 | y;
    //     while (cellCount>0) {
    //         count++;
    //         var cellValue = workingCells[--cellCount];
    //         lastLight = (cellValue >> 16) & 0xFF;
    //         x = (cellValue >> 8) & 0xFF;
    //         y = cellValue & 0xFF;
    //         if (x>=0&&x<width&&y>=0&&y<height) {
    //             var newLight = lastLight - tileOpacity(map.get(x,y));
    //             var currentLight = lightMap.get(x,y);
    //             if (newLight>currentLight && newLight>=0) {
    //                 lightMap.set(x,y,newLight);
    //                 workingCells[cellCount++] = newLight<<16 | x+1<<8 | y;
    //                 workingCells[cellCount++] = newLight<<16 | x<<8   | y+1;
    //                 workingCells[cellCount++] = newLight<<16 | x-1<<8 | y;
    //                 workingCells[cellCount++] = newLight<<16 | x<<8   | y-1;
    //             }
    //         }
    //     }
    // }

   public function applyLight(light:Light) {
        var x=light.x;
        var y=light.y;
        //lightMap.set(x,y,256);
        var encounteredWallness=0;
        var cellCount = 0;
        workingCells[cellCount++] = 0<<16 | x<<8 | y;
        while (cellCount>0) {
            count++;
            var cellValue = workingCells[--cellCount];
            encounteredWallness = (cellValue >> 16) & 0xFF;
            x = (cellValue >> 8) & 0xFF;
            y = cellValue & 0xFF;
            //trace(x,y);
            if (x>=0&&x<width&&y>=0&&y<height) {
                encounteredWallness += tileOpacity(map.get(x,y));
                var newLight = light.getRelativeLight(light.x-x, light.y-y)-encounteredWallness;
                var currentLight = lightMap.get(x,y);
                //trace(newLight,currentLight,encounteredWallness);
                if (newLight>currentLight && newLight>=0 && encounteredWallness>=0) {
                    lightMap.set(x,y,newLight);
                    workingCells[cellCount++] = encounteredWallness<<16 | x+1<<8 | y;
                    workingCells[cellCount++] = encounteredWallness<<16 | x<<8   | y+1;
                    workingCells[cellCount++] = encounteredWallness<<16 | x-1<<8 | y;
                    workingCells[cellCount++] = encounteredWallness<<16 | x<<8   | y-1;
                }
            }
        }
    }

    // public function applyLight(x:Int,y:Int,lastLight:Float) {
    //     count++;
    //     if (x<0||x==width||y<0||y==height) return;
    //     untyped if (visited[x<<8|y]!=null) return;
    //     untyped visited[x<<8|y]=true;
    //     var newLight = lastLight - tileOpacity(map.get(x,y));
    //     var currentLight = lightMap.get(x,y);
    //     if (newLight<=currentLight) return;
    //     lightMap.set(x,y,newLight);
    //     applyLight(x+1,y,newLight);
    //     applyLight(x,y+1,newLight);
    //     applyLight(x-1,y,newLight);
    //     applyLight(x,y-1,newLight);
    // }


    public function AddShadowLight(x:Int,y:Int,range:Int,colour:Int) {
        var minx:Int = cast Math.max(0, x - range);
        var maxx:Int = cast Math.min(width-1, x + range);
        var miny:Int = cast Math.max(0, y - range);
        var maxy:Int = cast Math.min(height-1, y + range);

        var px:Int = Math.ceil(x) ; //-1
        var py:Int = Math.ceil(y) ; //-1
        var maxi:Int = Std.int(range*1.41421356237);
        trace("light=",x,y);

        lightMap.set(x,y,256);

        for (i in 0...maxi) {
            var j:Int = cast Math.max(0, i-range);
            while (j <= i && j <= range) {
                updateOcclusion(px-i+j, py-j, x, y, true);
                if (j!=0) updateOcclusion(px-i+j, py+j, x, y, true);
                j++;
            }
        }
 
        for (i in 0...maxi) {
            var j:Int = cast Math.max(0, i-range);
            while (j <= i && j <= range) {
                updateOcclusion(px+j, py-i+j, x,y, false);
                if (j!=0) updateOcclusion(px-j+i, py+j, x,y, false);
                j++;
            }
        }

    }    

    public function updateOcclusion(x:Int,y:Int,lightX:Int,lightY:Int,normalize:Bool) {
        if(x >= 0 && x < width && y >= 0 && y < height) {
            var dX = x-lightX;
            var dY = y-lightY;
            if (dX==0&&dY==0)return;
            trace("-----------");
            trace("calc=",dX,dY);
            var dSQR = dX*dX+dY*dY;
            var intensity = Math.max(0,1 - dSQR/(10*10));
            var currentLight = lightMap.get(x,y);
            var newLight = 256*intensity;
            //if (newLight<=currentLight) return;
            //lightMap.set(x,y,256*intensity);      
            //calcOcclusion(x,y,false);      
            var occlusion = calcOcclusion(x,y,lightX,lightY,false);
            lightMap.set(x,y,occlusion);    
            trace("occlusion=",occlusion);  
        }
    }

    public function calcOcclusion(x:Int,y:Int,lightX:Int,lightY:Int,normalize:Bool) {
        
        var occlusion = tileOpacity(map.get(x,y));
        var recievingLight = 0;
        var dx:Int = lightX - x ;
        var dy:Int = lightY - y ;                  
        // var dx:Int = Math.ceil(lightX) - x -1;
        // var dy:Int = Math.ceil(lightY) - y -1;                  
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
        //lightSector.setFromCoords(x, y, x1, y1, x2, y2, normalize);            
        if(Math.abs(dx) + Math.abs(dy) > 1) //no direct connection with lightsource - there might be occlusion
            {
                var c = 0;
                trace("check");
                //gather horizontal
                if(dx > 0 && x<=width) {
                    recievingLight += lightMap.get(x+1,y);
                    c++;
                    trace("right");
                }
                    //incomingA.setIntersection(lightSector, right._lightSector);   
                else if(dx < 0 && x>=0) {
                    recievingLight += lightMap.get(x-1,y);
                    c++;
                    trace("left");
                }
                    //incomingA.setIntersection(lightSector, left._lightSector);    
                // else
                //     _incomingA.clear();
                
                //gather vertical
                if(dy > 0 && y<=height) {
                    recievingLight += lightMap.get(x,y+1);
                    c++;
                    trace("down");
                }
                    //_incomingB.setIntersection(_lightSector, down._lightSector);    
                else if(dy < 0 && y>=0) {
                    recievingLight += lightMap.get(x,y-1);
                    c++;
                    trace("up");
                }
                recievingLight = cast recievingLight/c;
                    //_incomingB.setIntersection(_lightSector, up._lightSector);  
                // else
                //     _incomingB.clear();
                
                //combine exposure from both edges and compare with max possible exposure (myTheta)
                //var myTheta:Float = _lightSector.theta;
                //_lightSector.setUnion(_incomingA, _incomingB);
                //occlusion = 1.0 - (_lightSector.theta / myTheta);                   
            } else {
                trace("direct=",dx,dy);
                recievingLight = 256;
            }
            // else
            //     occlusion = 0.0; //ends recursion    
            trace("recievingLight=",recievingLight);
            //recievingLight = cast Math.max(256,recievingLight);
            //recievingLight = cast Math.min(recievingLight/2,256);
            //trace("clamped recievingLight=",recievingLight);
            return Math.max(0,recievingLight - occlusion);
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
            var opacity = tileOpacity(map.get(x,y)); 
            var current = lightMap.get(x,y);
            if (current==0 && current<light) {

                    lightMap.set(x,y,light);
                    light-=opacity;
                }
                               
            
            if (light<=0) return false;
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

    public function castVoxelRays(x:Int,y:Int, range:Float) {
        lightMap.set(x,y,256);
        var rCeil:Int = Math.ceil(range);
        var dx:Int = -rCeil;
        var dy:Int = -rCeil;
        //castVoxelRay(new Vector2D(x,y), new Vector2D(dx+4, dy));
        //return;
        while (dx < rCeil) {
            castVoxelRay(new Vector2D(x,y), new Vector2D(dx++, dy));
        }
        //return;
        while (dy < rCeil)
            castVoxelRay(new Vector2D(x,y), new Vector2D(dx, dy++));
        while (dx > -rCeil)
            castVoxelRay(new Vector2D(x,y), new Vector2D(dx--, dy));
        while (dy > -rCeil)
            castVoxelRay(new Vector2D(x,y), new Vector2D(dx, dy--));
    }

    public function castVoxelRay( p1Original:Vector2D, p2Original:Vector2D, tileSize:Int = 16 )
    {
        //INITIALISE//////////////////////////////////////////
    p2Original.plusEquals(p1Original);
    p1Original.plusEquals2(0.5,0.5);
    p2Original.plusEquals2(0.5,0.5);
    p1Original.multEquals(16);
    p2Original.multEquals(16);

    //trace("start",p2Original.x/16,p2Original.y/16);
//js.Lib.debug();


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
        var light:Int = 256;
// trace("start");
        while( testX != endTileX || testY != endTileY ) {
            var currentLight = lightMap.get(testX,testY);
            //trace(testX,testY);
            if (  maxX < maxY ) {
            
                maxX += deltaX;
                testX += stepX;
                
                var data = map.get( testX, testY );
                var newLight = light - tileOpacity(data);
                //if (currentLight<newLight) {
                    lightMap.set(testX,testY,light);
                //}
                light=newLight;
                if (light<=0) return null;
                // if ( data != 0 ) {
                //     collisionPoint.x = testX;
                //     if ( stepX < 0 ) collisionPoint.x += 1.0; //add one if going left
                //     collisionPoint.y = p1.y + ratioY * ( collisionPoint.x - p1.x);  
                //     collisionPoint.x *= tileSize;//scale up
                //     collisionPoint.y *= tileSize;
                //     return collisionPoint;
                // }
            
            } else {
                
                maxY += deltaY;
                testY += stepY;
    
                var data = map.get( testX, testY );
                var newLight = light - tileOpacity(data);
                //if (currentLight<newLight) {
                    lightMap.set(testX,testY,light);
                //}
                light=newLight;
                if (light<=0) return null;
                // if ( data != 0 ) {
                //     collisionPoint.y = testY;
                //     if ( stepY < 0 ) collisionPoint.y += 1.0; //add one if going up
                //     collisionPoint.x = p1.x + ratioX * ( collisionPoint.y - p1.y);
                //     collisionPoint.x *= tileSize;//scale up
                //     collisionPoint.y *= tileSize;
                //     return collisionPoint;
                // }
            }
    
        }
        
        //no intersection found, just return end point:
        return p2Original;
    }
    


    public function drawTiles() {
        for (y in 0...height-1) {
            for (x in 0...width-1) {
                var tile = map.get(x,y);
                if (tile>0) {
                    var light = lightMap.get(x,y) & 0xFFFF;
                    renderer.AddSpriteToBatch(x*tileSize,y*tileSize,light,0xFF,0x00,0x00);                    
                }
            }
        }
    }

    inline public function tileOpacity(id:Int) {
        if (id==80) return 40;
        if (id==77) return 30;
        return 5;
    }

}       