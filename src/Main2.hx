
package ;

import engine.core.Component;
import engine.core.signals.Signal0;
import engine.core.signals.Signal1;
import engine.map.TileMapMap;
import engine.map.tmx.TmxMap;
import engine.systems.ParticleSystem;
import engine.systems.RenderSystem;
import js.Browser;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.Element;
import utils.Base64;
import wgr.display.Camera;
import wgr.display.DisplayListIter;
import wgr.display.DisplayObject;
import wgr.display.DisplayObjectContainer;
import wgr.display.Sprite;
import wgr.display.Stage;
import wgr.geom.Matrix3;
import wgr.geom.Point;
import wgr.geom.Rectangle;
import wgr.particle.PointSpriteParticleEngine;
import wgr.renderers.canvas.CanvasDebugView;
import wgr.renderers.webgl.PointSpriteRenderer;
import wgr.renderers.webgl.SpriteRenderer;
import wgr.renderers.webgl.WebGLBatch;
import wgr.renderers.webgl.WebGLRenderer;
import wgr.texture.Texture;
import wgr.renderers.webgl.TileMap;

class Main2
{

    public static function main() {

        var assets = new utils.AssetLoader();

        assets.addEventListener("loaded", function(event){

            var gameLoop = new engine.GameLoop();

            var tmxMap = new TmxMap(assets.assets.get("data/testMap.tmx"));
            tmxMap.tilesets[0].set_image(assets.assets.get("data/spelunky-tiles.png"));
            var mapData = engine.map.tmx.TmxLayer.layerToCoordTexture(tmxMap.getLayer("Tile Layer 1"));

            var view = new engine.view.View(800,600,false);

            var tm  = new wgr.texture.TextureManager(view.renderer.gl);
            tm.AddTexturesFromConfig(assets.assets.get("data/textureConfig.xml"),assets.assets);

            var tileMapRenderer = new test.ParticleTileMap();
                tileMapRenderer.renderer.SetSpriteSheet(tm.baseTextures.get("tiles").texture,16,16,22);
                view.renderer.AddRenderer(tileMapRenderer.renderer);

            // var spriteRender = new SpriteRenderer();
            //     spriteRender.AddStage(view.stage);
            //     view.renderer.AddRenderer(spriteRender);

            function createSprite(id:String,x:Float,y:Float,px:Float,py:Float,tid:String) {
                var s = new Sprite();
                s.id = id;
                s.texture = tm.textures.get(tid);
                s.position.x = x;
                s.position.y = y;
                s.pivot.x = px;
                s.pivot.y = py;
                return s;
            }

            var itemContainer = new DisplayObjectContainer();
                itemContainer.id = "itemContainer";
                view.camera.addChild(itemContainer);

            var entityManager = new engine.core.EntityManager();
                entityManager.addSystem(new RenderSystem(itemContainer));

                entityManager.componentAdded.add(function(component:Component){
                    trace(component.name);
                });

            var e1 = new engine.core.Entity();
            var spr3 = createSprite("character",400,380,0,0,"texturechar1");
            spr3.scale.x = -1;
            spr3.pivot.x = 50/2;
            spr3.pivot.y = 75;

            e1.add(new engine.components.Physics(400,380,0))
              .add(new engine.components.Sprite(spr3))
              .add(new engine.components.KeyboardControls(gameLoop.keyboard));
            entityManager.addEntity(e1);

            function tick() {
                entityManager.Update(1000/60);
                view.camera.Focus(spr3.position.x,spr3.position.y);
                tileMapRenderer.test.setTo(spr3.position.x,spr3.position.y);
                tileMapRenderer.draw();
                view.renderer.Render(view.camera.viewPortAABB);
            }

            gameLoop.updateFunc = tick;
            gameLoop.start();

            Browser.document.getElementById("stopbutton").addEventListener("click",function(event){
                gameLoop.stop();
            });
            Browser.document.getElementById("startbutton").addEventListener("click",function(event){
                gameLoop.start();
            });
            Browser.document.getElementById("debugbutton").addEventListener("click",function(event){
                // debugSwitch = !debugSwitch;
                //debug.Clear(camera);
            });
            Browser.document.getElementById("action1").addEventListener("click",function(event){
            });
            Browser.document.getElementById("action2").addEventListener("click",function(event){
            });


        } );

        assets.SetImagesToLoad( ["data/textureConfig.xml","data/testMap.tmx","data/1up.png","data/spelunky-tiles.png","data/spelunky0.png","data/spelunky1.png","data/characters.png","data/tilescompressed.png"] );
        assets.Load();
        // var m = physics.dynamics.Material.DEFAULTMATERIAL();

    }   
    
}