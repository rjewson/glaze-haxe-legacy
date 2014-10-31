package ;

import ash.core.Engine;
import ash.core.Entity;
import engine.components.Camera;
import engine.components.DebugDisplay;
import engine.components.Display;
import engine.components.MotionControls;
import engine.components.Physics;
import engine.components.Position;
import engine.GameLoop;
import engine.map.TileMapMap;
import engine.map.tmx.TmxMap;
import engine.systems.CameraControlSystem;
import engine.systems.DebugRenderSystem;
import engine.systems.MotionControlSystem;
import engine.systems.PhysicsSystem;
import engine.systems.RenderSystem;
import js.Browser;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.Element;
import physics.geometry.Polygon;
import physics.geometry.Polygon.CreateRectangle;
import physics.geometry.Vector2D;
import utils.Base64;
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
        //var managedGrid = new physics.collision.broadphase.managedgrid.ManagedGrid(60,60,new physics.collision.narrowphase.sat.SAT(),10,10,100);

        var assets = new utils.AssetLoader();

        assets.addEventListener("loaded", function(event){
 
            var gameLoop = new GameLoop();

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

            var mainEngine = new Engine();
            mainEngine.addSystem(new PhysicsSystem(),0);            
            mainEngine.addSystem(new MotionControlSystem(gameLoop.keyboard),1);
            mainEngine.addSystem(new CameraControlSystem(view.camera), 4);
            mainEngine.addSystem(new RenderSystem( itemContainer ), 5);
            // mainEngine.addSystem(new DebugRenderSystem( view.debugRenderer ), 6);

            var spr1 = createSprite("character",400,380,0,0,"texturechar1");
            spr1.scale.x = -1;
            spr1.pivot.x = 48/2;
            spr1.pivot.y = 72/2;

            var e1 = new Entity()
            .add(new Position(0,0,0))
            .add(new Physics(0,0,1,1,[new Polygon(CreateRectangle(48,72),new Vector2D(0,0))]))
            .add(new Display(spr1))
            .add(new DebugDisplay())
            .add(new MotionControls())
            .add(new Camera());
            mainEngine.addEntity(e1);

            var spr2 = createSprite("character",400,380,0,0,"texturechar1");
            spr2.scale.x = -1;
            spr2.pivot.x = 48/2;
            spr2.pivot.y = 72/2;

            var e2 = new Entity()
            .add(new Position(0,0,0))
            .add(new Physics(200,200,0,0,[new Polygon(CreateRectangle(48,72),new Vector2D(0,0))]))
            .add(new Display(spr2))
            .add(new DebugDisplay());
            mainEngine.addEntity(e2);


            function tick(time:Float) {
                mainEngine.update(time);
                view.renderer.Render(view.camera.viewPortAABB);
                //lightGrid.renderLightGrid();
                //lightGrid.draw();
                //trace(haxe.Timer.stamp());
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
            });
            Browser.document.getElementById("action1").addEventListener("click",function(event){
                e1.remove(Display);
            });
            Browser.document.getElementById("action2").addEventListener("click",function(event){
            });

        } );

        assets.SetImagesToLoad( ["data/textureConfig.xml","data/testMap.tmx","data/1up.png","data/spelunky-tiles.png","data/spelunky0.png","data/spelunky1.png","data/characters.png","data/tilescompressed.png"] );
        assets.Load();
        
    }	
    
}