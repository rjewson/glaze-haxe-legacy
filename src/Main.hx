
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
            stage.addChild(camera);

            var canvasView:CanvasElement = cast(Browser.document.getElementById("view"),CanvasElement);
            var renderer = new WebGLRenderer(stage,canvasView);
            var tm  = new wgr.texture.TextureManager(renderer.gl);
            var basetexture1up = tm.AddTexture("mushroom",assets.assets[0]);
            var texture1up = new Texture(basetexture1up,new Rectangle(0,0,256,256));
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
            camera.addChild(spr2);

            var spr21 = new Sprite();
            spr21.id = "spr21";
            spr21.texture = texture1up;
            spr21.position.x = 328;
            spr21.position.y = 328;
            spr21.pivot.x = 128;
            spr21.pivot.y = 128;
            spr2.addChild(spr21);

            // var spr211 = new Sprite();
            // spr211.id = "spr211";
            // spr21.addChild(spr211);

            stage.Flatten();

            var tileMap = new TileMap( renderer.gl );
            tileMap.SetSpriteSheet(assets.assets[1]);
            tileMap.SetTileLayer(assets.assets[2],"base",1,1);
            tileMap.tileSize = 16;
            tileMap.TileScale(2);
            tileMap.SetCamera(camera);
            renderer.AddRenderer(tileMap);

            var spriteRender = new SpriteRenderer();
            renderer.AddRenderer(spriteRender);
            spriteRender.spriteBatch.spriteHead = stage.head;

            var startTime = Date.now().getTime();

            function tick() {
                spr1.rotation += 0.01;
                var elapsed = Date.now().getTime() - startTime;
                var xp = (Math.sin(elapsed / 2000) * 0.5 + 0.5) * 328;
                var yp = (Math.sin(elapsed / 5000) * 0.5 + 0.5) * 370;
                camera.Focus(xp,yp);
                renderer.Render();
                Browser.window.requestAnimationFrame(cast tick);
            }

            tick();            

        } );

        assets.SetImagesToLoad( ["1up.png","spelunky-tiles.png","spelunky0.png"] );

    }	
    
}