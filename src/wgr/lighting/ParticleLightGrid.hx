
package wgr.lighting;

import ds.Array2D;
import js.html.Uint8Array;
import wgr.lighting.FloodFillLight;
import wgr.renderers.webgl.PointSpriteLightMapRenderer;

class ParticleLightGrid
{

    public var map:Array2D;
    public var lightMap:Array2D;
    public var tileSize:Float;
    public var halfTileSize:Float;
    public var renderer:PointSpriteLightMapRenderer;

    public var width:Int;
    public var height:Int;

    public var lights:Array<ILight>;
    public var tileOpacities:Uint8Array;

    public var count:Int;

    public function new(){
        this.width = 50;
        this.height = 40;
        this.map = new Array2D(this.width,this.height);
        this.lightMap = new Array2D(this.width,this.height);
        this.tileSize = 32;
        this.halfTileSize = this.tileSize/2;
        this.renderer = new PointSpriteLightMapRenderer();
        this.renderer.ResizeBatch(width*height);
        this.lights = new Array<ILight>();
        this.lights.push(new FloodFillLight(15,5,20,255));
        SetTileOpacities();
    }

    public function SetTileOpacities() {


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

        tileOpacities = new Uint8Array(256);
        for (i in 0...tileOpacities.length) {
            tileOpacities[i] = 1;
        }
        tileOpacities[80] = 40;
        tileOpacities[77] = 30;
        tileOpacities[31] =  5;
    }

    public function draw() {
        reset();
        drawLights();
        renderLightGrid();
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
            light.renderLight(map,tileOpacities,lightMap);
        }
    }

    public function renderLightGrid() {
        for (y in 0...height-1) {
            for (x in 0...width-1) {
                var light:Int = cast lightMap.get(x,y);
                renderer.AddSpriteToBatch((x*tileSize)+halfTileSize,(y*tileSize)+halfTileSize,255-light,0x00,0x00,0x00);                    
            }
        }
    }

}