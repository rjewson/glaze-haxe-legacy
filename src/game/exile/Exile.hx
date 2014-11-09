
package game.exile;

import ash.core.Engine;
import ash.core.Entity;
import ds.Array2D;
import engine.components.Camera;
import engine.components.DebugDisplay;
import engine.components.Display;
import engine.components.MotionControls;
import engine.components.Physics;
import engine.components.Position;
import engine.core.BaseGame;
import engine.map.tmx.TmxLayer;
import engine.map.tmx.TmxMap;
import engine.systems.CameraControlSystem;
import engine.systems.DebugRenderSystem;
import engine.systems.MotionControlSystem;
import engine.systems.PhysicsSystem;
import engine.systems.RenderSystem;
import engine.view.View;
import game.exile.entities.EntityFactory;
import physics.geometry.Polygon;
import physics.geometry.Vector2D;
import utils.AssetLoader;
import wgr.display.DisplayObjectContainer;
import wgr.display.Sprite;
import wgr.particle.PointSpriteParticleEngine;
import wgr.renderers.webgl.SpriteRenderer;
import wgr.renderers.webgl.TileMap;
import wgr.texture.TextureManager;
import worldEngine.WorldData;

class Exile extends BaseGame
{

    public static inline var TEXTURE_CONFIG:String = "data/sprites.json";
    public static inline var TEXTURE_DATA:String = "data/sprites.png";
    public static inline var MAP_DATA:String = "data/testMap.tmx";
    public static inline var TILE_SPRITE_SHEET:String = "data/spelunky-tiles.png";
    public static inline var TILE_MAP_DATA_1:String = "data/spelunky0.png";
    public static inline var TILE_MAP_DATA_2:String = "data/spelunky1.png";


    public var tmxMap:TmxMap; 
    public var mapData:Array2D;

    public var view:View;
    public var tm:TextureManager;

    public var tileMap:TileMap;

    public var spriteRender:SpriteRenderer;

    public var pointParticleEngine:PointSpriteParticleEngine;

    public var itemContainer:DisplayObjectContainer;

    public var factory:EntityFactory;

    public var mainEngine:Engine;

    public function new() {
        super();
        loadAssets( [TEXTURE_CONFIG,TEXTURE_DATA,MAP_DATA,TILE_MAP_DATA_1,TILE_MAP_DATA_2,TILE_SPRITE_SHEET] );
    }


    override public function prepareEngine() {

        factory = new EntityFactory(tm);

        mainEngine = new Engine();
        mainEngine.addSystem(new PhysicsSystem(new WorldData(32,tmxMap,"Tile Layer 1")),0);            
        mainEngine.addSystem(new MotionControlSystem(gameLoop.keyboard),1);
        mainEngine.addSystem(new CameraControlSystem(view.camera), 4);
        mainEngine.addSystem(new RenderSystem( itemContainer ), 5);
        mainEngine.addSystem(new DebugRenderSystem( view.debugRenderer ), 6);

        createEntities();

        gameLoop.updateFunc = tick;
        gameLoop.start();

    }

    public function createEntities() {

        mainEngine.addEntity(factory.create("player",50,50));
        mainEngine.addEntity(factory.create("enemy",400,100));
        
        mainEngine.addEntity(factory.create("projectile",350,100));

    }


    public function tick(time:Float) {
        mainEngine.update(time);
        view.renderer.Render(view.camera.viewPortAABB);
        // lightGrid.renderLightGrid();
        // lightGrid.draw();
    }

    override public function prepareRenderer() {
        tmxMap = new TmxMap(assets.assets.get(MAP_DATA));
        tmxMap.tilesets[0].set_image(assets.assets.get(TILE_SPRITE_SHEET));
        
        mapData = engine.map.tmx.TmxLayer.layerToCoordTexture(tmxMap.getLayer("Tile Layer 1"));

        view = new View(800,600,false);

        tm  = new TextureManager(view.renderer.gl);
        tm.ParseTexturePackerJSON( assets.assets.get(TEXTURE_CONFIG) , assets.assets.get(TEXTURE_DATA) );
        // tm.AddTexturesFromConfig(assets.assets.get(TEXTURE_CONFIG),assets.assets);
js.Lib.debug();
        tileMap = new TileMap();
            view.renderer.AddRenderer(tileMap);
            tileMap.SetSpriteSheet(assets.assets.get(TILE_SPRITE_SHEET));
            tileMap.SetTileLayerFromData(mapData,"base",1,1);
            tileMap.SetTileLayer(assets.assets.get(TILE_MAP_DATA_2),"bg",0.6,0.6);
            tileMap.tileSize = 16;
            tileMap.TileScale(2);

        spriteRender = new SpriteRenderer();
            spriteRender.AddStage(view.stage);
            view.renderer.AddRenderer(spriteRender);

        pointParticleEngine = new PointSpriteParticleEngine(14000,1000/60);
            pointParticleEngine.renderer.SetSpriteSheet(tileMap.spriteSheet,16,8,8);
            view.renderer.AddRenderer(pointParticleEngine.renderer);

        itemContainer = new DisplayObjectContainer();
            itemContainer.id = "itemContainer";
            view.camera.addChild(itemContainer);
    }

}