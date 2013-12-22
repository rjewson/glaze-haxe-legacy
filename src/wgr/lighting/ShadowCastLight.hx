
package wgr.lighting;

class ShadowCastLight 
{

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

}