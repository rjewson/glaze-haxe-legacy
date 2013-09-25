
package ;

import js.Browser;
import js.html.CanvasElement;
import js.html.Element;
import wgr.display.DisplayObject;
import wgr.display.Sprite;
import wgr.display.Stage;
import wgr.geom.Matrix3;
import wgr.geom.Point;
import wgr.geom.Rectangle;
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

            var spr1 = new Sprite();
            spr1.id = "spr1";

            stage.addChild(spr1);

            spr1.position.x = 128;
            spr1.position.y = 128;
            spr1.pivot.x = 128;
            spr1.pivot.y = 128;

            stage.updateTransform();

            var canvasView:CanvasElement = cast(Browser.document.getElementById("view"),CanvasElement);
            var renderer = new WebGLRenderer(stage,canvasView);
            var tm  = new wgr.texture.TextureManager(renderer.gl);

            var basetexture1up = tm.AddTexture("mushroom",assets.assets[0]);
            var texture1up = new Texture(basetexture1up,new Rectangle(0,0,256,256));
            spr1.texture = texture1up;

            var batch = new WebGLBatch(renderer.gl);
            batch.GrowBatch();
            batch.sprite = spr1;
            renderer.spriteBatch = batch;
            renderer.Render();

            var tileMap = new TileMap( renderer.gl );
            tileMap.SetSpriteSheet(assets.assets[1]);
            tileMap.SetTileLayer(assets.assets[2],"base",1,1);
            tileMap.tileSize = 16;
            tileMap.TileScale(2);
            tileMap.Resize(200, 200);

            renderer.gl.clearColor(0.0, 0.0, 0.1, 1.0);
            renderer.gl.clearDepth(1.0);
            renderer.gl.viewport(0, 0, 200, 200);
            renderer.gl.clear(js.html.webgl.RenderingContext.COLOR_BUFFER_BIT | js.html.webgl.RenderingContext.DEPTH_BUFFER_BIT);
 
            tileMap.Draw(1,1);
            
           

            function r() {
                renderer.Render();
                Browser.window.requestAnimationFrame(cast r);
                spr1.rotation += 0.01;
            }

            //r();            

        } );

        assets.SetImagesToLoad( ["1up.png","spelunky-tiles.png","spelunky0.png"] );

    }	
    
}