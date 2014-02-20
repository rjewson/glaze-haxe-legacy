
package ;

import engine.components.action.ActionList;
import engine.components.action.Delay;
import engine.components.action.Sync;
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
import physics.geometry.Vector2D;
import test.actions.ConsoleMsgAction;
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
import wgr.lighting.ParticleLightGrid;
import wgr.particle.PointSpriteParticleEngine;
import wgr.renderers.canvas.CanvasDebugView;
import wgr.renderers.webgl.PointSpriteRenderer;
import wgr.renderers.webgl.SpriteRenderer;
import wgr.renderers.webgl.WebGLBatch;
import wgr.renderers.webgl.WebGLRenderer;
import wgr.texture.Texture;
import wgr.renderers.webgl.TileMap;

class Main 
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

            var tileMap = new TileMap();
                view.renderer.AddRenderer(tileMap);
                tileMap.SetSpriteSheet(assets.assets.get("data/spelunky-tiles.png"));
                tileMap.SetTileLayerFromData(mapData,"base",1,1);
                tileMap.SetTileLayer(assets.assets.get("data/spelunky1.png"),"bg",0.6,0.6);
                tileMap.tileSize = 16;
                tileMap.TileScale(2);

            var spriteRender = new SpriteRenderer();
                spriteRender.AddStage(view.stage);
                view.renderer.AddRenderer(spriteRender);

            var pointParticleEngine = new PointSpriteParticleEngine(14000,1000/60);
                pointParticleEngine.renderer.SetSpriteSheet(tileMap.spriteSheet,16,8,8);
                view.renderer.AddRenderer(pointParticleEngine.renderer);


            var lightGrid = new ParticleLightGrid();
                //tileMapRenderer.renderer.SetSpriteSheet(tm.baseTextures.get("tiles").texture,16,16,22);
                view.renderer.AddRenderer(lightGrid.renderer);

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
                entityManager.addSystem(new ParticleSystem(pointParticleEngine));

                entityManager.componentAdded.add(function(component:Component){
                    //trace(component.name);
                });

            var e1 = new engine.core.Entity();
            var spr3 = createSprite("character",400,380,0,0,"texturechar1");
            spr3.scale.x = -1;
            spr3.pivot.x = 50/2;
            spr3.pivot.y = 75;

            e1.add(new engine.components.Physics(400,380,0))
              .add(new engine.components.Sprite(spr3))
              .add(new engine.components.KeyboardControls(gameLoop.keyboard))
              .add(new engine.components.ParticleEmitter());

            var actionList = new ActionList();
            actionList.AddToEnd(new Delay(2000))
                      .AddToEnd(new ConsoleMsgAction("It works"));
            e1.add(actionList);
            trace(actionList);
            entityManager.addEntity(e1);

            var xpos = 0, ypos = 0;
            for (i in 0...100) {
                var newSpr = new Sprite();
                newSpr.id="newSpr"+i;
                newSpr.texture = tm.textures.get("texturechar1");
                xpos++;
                if (xpos>99) {
                    xpos=0;
                    ypos++;
                }
                newSpr.pivot.x = 50/2;
                newSpr.pivot.y = 75/2;

                var e = new engine.core.Entity();
                e.add(new engine.components.Physics(100 + xpos*20,100 + ypos*20,0))
                 .add(new engine.components.Sprite(newSpr));
                entityManager.addEntity(e);

            }

            function tick() {
                entityManager.Update(1000/60);
                view.camera.Focus(spr3.position.x,spr3.position.y);
                view.renderer.Render(view.camera.viewPortAABB);
                // lightGrid.renderLightGrid();
                // lightGrid.draw();
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
        
    }	
    
}