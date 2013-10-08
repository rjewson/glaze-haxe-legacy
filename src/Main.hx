
package ;

import js.Browser;
import js.html.CanvasElement;
import js.html.Element;
import wgr.display.Camera;
import wgr.display.DisplayObject;
import wgr.display.Sprite;
import wgr.display.Stage;
import wgr.geom.Matrix3;
import wgr.geom.Point;
import wgr.geom.Rectangle;
import wgr.renderers.canvas.CanvasDebugView;
import wgr.renderers.webgl.SpriteRenderer;
import wgr.renderers.webgl.WebGLBatch;
import wgr.renderers.webgl.WebGLRenderer;
import wgr.texture.Texture;
import wgr.tilemap.TileMap;

class Main 
{

	public static function main() {

        var assets = new utils.ImageLoader();

        assets.addEventListener("loaded", function(event){

            var stage = new Stage();
            var camera = new Camera();
            camera.worldExtentsAABB = new wgr.geom.AABB(0,2000,2000,0);
            stage.addChild(camera);

            var canvasView:CanvasElement = cast(Browser.document.getElementById("view"),CanvasElement);
            var renderer = new WebGLRenderer(stage,canvasView,800,600);

            var debugView:CanvasElement = cast(Browser.document.getElementById("viewDebug"),CanvasElement);
            var debug = new CanvasDebugView(debugView,800,600);

            var tm  = new wgr.texture.TextureManager(renderer.gl);
            var basetexture1up = tm.AddTexture("mushroom",assets.assets[0]);
            var texture1up = new Texture(basetexture1up,new Rectangle(0,0,256,256));

            var basetexturechar = tm.AddTexture("char",assets.assets[4]);
            var texturechar1 = new Texture(basetexturechar,new Rectangle(0,0,50,75));

            camera.Resize(renderer.width,renderer.height);

            var spr1 = new Sprite();
            spr1.id = "spr1";
            spr1.texture = texture1up;
            spr1.position.x = 128;
            spr1.position.y = 128;
            spr1.pivot.x = 128;
            spr1.pivot.y = 128;
            camera.addChild(spr1);

            var spr2 = new Sprite();
            spr2.id = "spr2";
            spr2.texture = texture1up;
            spr2.position.x = 228;
            spr2.position.y = 228;
            spr2.pivot.x = 128;
            spr2.pivot.y = 128;
            //spr2.visible = false;
            camera.addChild(spr2);

            var spr21 = new Sprite();
            spr21.id = "spr21";
            spr21.texture = texture1up;
            spr21.position.x = 328;
            spr21.position.y = 328;
            spr21.pivot.x = 128;
            spr21.pivot.y = 128;
            spr21.alpha = 0.9;
            spr2.addChild(spr21);

            var spr3 = new Sprite();
            spr3.id = "spr3";
            spr3.texture = texturechar1;
            spr3.position.x = 400;
            spr3.position.y = 400;
            camera.addChild(spr3);
/*
            var sprArray = new Array<Sprite>();
            for (i in 0...1000) {
                var newSpr = new Sprite();
                newSpr.id="newSpr"+i;
                newSpr.texture = texture1up;
                newSpr.position.x = Std.random(400)+200;
                newSpr.position.y = Std.random(400)+200;
                newSpr.alpha = Math.random();
                newSpr.pivot.x = 128;
                newSpr.pivot.y = 128;
                newSpr.rotation = Math.random();
                camera.addChild(newSpr);
                sprArray.push(newSpr);
            }
*/
            // var spr211 = new Sprite();
            // spr211.id = "spr211";
            // spr21.addChild(spr211);

            stage.Flatten();

            var tileMap = new TileMap( renderer.gl );
            tileMap.SetSpriteSheet(assets.assets[1]);
            tileMap.SetTileLayer(assets.assets[2],"base",1,1);
            tileMap.SetTileLayer(assets.assets[3],"bg",0.6,0.6);
            tileMap.tileSize = 16;
            tileMap.TileScale(2);
            tileMap.SetCamera(camera);
            renderer.AddRenderer(tileMap);

            var spriteRender = new SpriteRenderer();
            spriteRender.AddStage(stage);
            renderer.AddRenderer(spriteRender);

            var startTime = Date.now().getTime();
            var stop = false;
            var debugSwitch = false;

            function tick() {
                spr1.rotation += 0.01;
                spr2.rotation -= 0.02;
                spr21.rotation += 0.04;

                // for (spr in sprArray) {
                //     spr.rotation+=0.04;
                //     spr.alpha+=0.001;
                //     if(spr.alpha>1)spr.alpha=0;
                // }

                var elapsed = Date.now().getTime() - startTime;
                var xp = (Math.sin(elapsed / 2000) * 0.5 + 0.5) * 528;
                var yp = (Math.sin(elapsed / 5000) * 0.5 + 0.5) * 570;
                camera.Focus(xp,yp);
                renderer.Render(camera.viewPortAABB);
                //trace(spr1.aabb);
                if (debugSwitch) {
                    debug.Clear(camera);
                    debug.DrawAABB(spr1.subTreeAABB);
                    debug.DrawAABB(spr2.subTreeAABB);                    
                }
                if (!stop) Browser.window.requestAnimationFrame(cast tick);
            }

            Browser.document.getElementById("stopbutton").addEventListener("click",function(event){
                stop=true;
            });
            Browser.document.getElementById("startbutton").addEventListener("click",function(event){
                if (stop==true) {
                    stop=false;
                    tick();                    
                } 
            });
            Browser.document.getElementById("debugbutton").addEventListener("click",function(event){
                debugSwitch = !debugSwitch;
                debug.Clear(camera);
            });
            Browser.document.getElementById("action1").addEventListener("click",function(event){
                camera.removeChild(spr2);
                trace(spr2);
            });
            Browser.document.getElementById("action2").addEventListener("click",function(event){
                camera.addChild(spr2);
                trace(spr2);
            });

            tick();            

        } );

        assets.SetImagesToLoad( ["1up.png","spelunky-tiles.png","spelunky0.png","spelunky1.png","characters.png"] );

    }	
    
}