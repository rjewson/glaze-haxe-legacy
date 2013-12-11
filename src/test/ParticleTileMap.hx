
package test;

import ds.Array2D;
import test.Light;
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


    public function new() {
        this.width = 50;
        this.height = 40;
        this.map = new Array2D(this.width,this.height);
        this.lightMap = new Array2D(this.width,this.height);
        this.tileSize = 16;
        this.renderer = new PointSpriteRenderer();
        this.renderer.ResizeBatch(width*height);
        this.lights = new Array<Light>();
        this.lights.push(new Light(25,5,400));
        this.lights.push(new Light(20,9,200));
        this.lights.push(new Light(30,30,255));
        this.lights.push(new Light(60,18,255));
        this.lights.push(new Light(5,40,255));
        InitMap();
    }

    public function InitMap() {
       for (y in 0...height-1) {
            for (x in 0...width-1) {
                var tileType = 77;
                if (x==20||x==30)
                    tileType = 80;
                map.set(x,y,tileType);
            }
        }        
    }

    public function draw() {
        count=0;
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
        for (light in lights) {
            applyLight(light.x,light.y,light.intensity);
        }
    }

    public function applyLight(x:Int,y:Int,lastLight:Float) {
        count++;
        if (x<0||x==width||y<0||y==height) return;
        var newLight = lastLight - 25;//tileOpacity(map.get(x,y));
        var currentLight = lightMap.get(x,y);
        if (newLight<=currentLight) return;
        lightMap.set(x,y,newLight);
        applyLight(x+1,y,newLight);
        applyLight(x,y+1,newLight);
        applyLight(x-1,y,newLight);
        applyLight(x,y-1,newLight);
    }

    public function drawTiles() {
        for (y in 0...height-1) {
            for (x in 0...width-1) {
                var tile = map.get(x,y);
                var light = lightMap.get(x,y);
                renderer.AddSpriteToBatch(tile,x*tileSize,y*tileSize,16,0xFF,light,light,light);
            }
        }
    }

    inline public function tileOpacity(id:Int) {
        if (id==80) return 256;
        return 10;
    }

}       