
package ;

import engine.core.Component;
import engine.core.signals.Signal0;
import engine.core.signals.Signal1;
import engine.map.TileMapMap;
import engine.map.tmx.TmxMap;
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

class Main 
{

	public static function main() {

        var assets = new utils.AssetLoader();

        assets.addEventListener("loaded", function(event){

            var gameLoop = new engine.GameLoop();

            var tmxMap = new TmxMap(assets.assets.get("data/testMap.tmx"));
            tmxMap.tilesets[0].set_image(assets.assets.get("data/spelunky-tiles.png"));
            var mapData = engine.map.tmx.TmxLayer.layerToCoordTexture(tmxMap.getLayer("Tile Layer 1"));

            //var view = new engine.view.View();

            var stage = new Stage();
            var camera = new Camera();
            camera.worldExtentsAABB = new wgr.geom.AABB(0,2000,2000,0);
            stage.addChild(camera);

            var canvasView:CanvasElement = cast(Browser.document.getElementById("view"),CanvasElement);
            var renderer = new WebGLRenderer(stage,camera,canvasView,800,600);

            var debugView:CanvasElement = cast(Browser.document.getElementById("viewDebug"),CanvasElement);
            var debug = new CanvasDebugView(debugView,800,600);

            camera.Resize(renderer.width,renderer.height);

            var tm  = new wgr.texture.TextureManager(renderer.gl);
            tm.AddTexturesFromConfig(assets.assets.get("data/textureConfig.xml"),assets.assets);

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
            camera.addChild(itemContainer);

            var entityManager = new engine.core.EntityManager();

            entityManager.addSystem(new RenderSystem(itemContainer));

            entityManager.componentAdded.add(function(component:Component){
                trace(component.name);
            });

            var e1 = new engine.core.Entity();
            e1.add(new engine.components.Physics(400,380,0));
            var spr3 = createSprite("character",400,380,0,0,"texturechar1");
            spr3.scale.x = -1;
            spr3.pivot.x = 50/2;
            spr3.pivot.y = 75;
            //itemContainer.addChild(spr3);
            e1.add(new engine.components.Sprite(spr3));
            entityManager.addEntity(e1);
            e1.add(new engine.components.KeyboardControls(gameLoop.keyboard));

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
                e.add(new engine.components.Physics(100 + xpos*20,100 + ypos*20,0));
                //itemContainer.addChild(newSpr);
                e.add(new engine.components.Sprite(newSpr));
                entityManager.addEntity(e);

            }

            //itemContainer.debug();

            // var itr = new DisplayListIter(stage);
            // for (item in itr) {
            //     trace(item.id);
            // }

            var tileMap = new TileMap();
                renderer.AddRenderer(tileMap);
                tileMap.SetSpriteSheet(assets.assets.get("data/spelunky-tiles.png"));
                tileMap.SetTileLayerFromData(mapData,"base",1,1);
                tileMap.SetTileLayer(assets.assets.get("data/spelunky1.png"),"bg",0.6,0.6);
                tileMap.tileSize = 16;
                tileMap.TileScale(2);

            var spriteRender = new SpriteRenderer();
                spriteRender.AddStage(stage);
                renderer.AddRenderer(spriteRender);

            var pointParticleEngine = new PointSpriteParticleEngine(3000,1000/60);
                pointParticleEngine.renderer.SetSpriteSheet(tileMap.spriteSheet,16,8,8);
                renderer.AddRenderer(pointParticleEngine.renderer);

            var startTime = Date.now().getTime();
            var stop = false;
            var debugSwitch = false;

            function tick() {

                for (pCount in 0...5) {
                    var vX = Std.random(100)-50;
                    var vY = Std.random(100)-50;
                    var ttl = Std.random(1000)+500;
                    var type = 1;//validTiles[Std.random(validTiles.length)];
                    pointParticleEngine.EmitParticle(spr3.position.x,spr3.position.y,vX,vY,0,0,ttl,0.99,true,true,null,type,32,0xFFFFFFFF);                    
                }

                entityManager.Update(1000/60);
                camera.Focus(spr3.position.x,spr3.position.y);
                pointParticleEngine.Update();
                renderer.Render(camera.viewPortAABB);

                if (debugSwitch) {
                    debug.Clear(camera);
                    // debug.DrawAABB(spr1.subTreeAABB);
                    // debug.DrawAABB(spr2.subTreeAABB);                    
                }

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
                debugSwitch = !debugSwitch;
                debug.Clear(camera);
            });
            Browser.document.getElementById("action1").addEventListener("click",function(event){
                var child = itemContainer.removeChildAt(3);
                itemContainer.addChildAt(child,4);
            });
            Browser.document.getElementById("action2").addEventListener("click",function(event){
            });


        } );

        assets.SetImagesToLoad( ["data/textureConfig.xml","data/testMap.tmx","data/1up.png","data/spelunky-tiles.png","data/spelunky0.png","data/spelunky1.png","data/characters.png"] );
        assets.Load();
        // var pengine = new physics.PhysicsEngine(60,60,new physics.collision.narrowphase.sat.SAT());
        //var pengine = new physics.collision.broadphase.managedgrid.ManagedGrid(60,60,new physics.collision.narrowphase.sat.SAT(),16,16,16);

        // var m = physics.dynamics.Material.DEFAULTMATERIAL();

    }	
    
}