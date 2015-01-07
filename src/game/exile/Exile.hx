
package game.exile;

import ds.Array2D;
import eco.core.Engine;
import eco.core.Entity.Create;
import eco.systems.EntityUpdater;
import engine.core.BaseGame;
import engine.graphics.StaticLayerDisplayManager;
import engine.input.DigitalInput;
import engine.map.tmx.TmxLayer;
import engine.map.tmx.TmxMap;
import engine.systems.InputSystem;
import engine.systems.ParticleSystem;
import engine.systems.PhysicsSystem;
import engine.systems.RenderSystem;
import engine.view.View;
import game.exile.components.GunTurret;
import game.exile.entities.EntityFactory;
import js.Browser;
import physics.geometry.Polygon;
import physics.geometry.Vector2D;
import utils.AssetLoader;
import wgr.display.Camera;
import wgr.display.DisplayObjectContainer;
import wgr.display.Sprite;
import wgr.particle.BlockSpriteParticleEngine;
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

    public var digitalInput:DigitalInput;

    public var tileMap:TileMap;

    public var spriteRender:SpriteRenderer;

    public var pointParticleEngine:PointSpriteParticleEngine;
    public var blockParticleEngine:BlockSpriteParticleEngine;

    public var itemContainer:DisplayObjectContainer;

    public var factory:EntityFactory;

    public var mainEngine:Engine;

    public var worldData:WorldData;

    public var camera:Camera;

    public function new() {
        super();
        loadAssets( [TEXTURE_CONFIG,TEXTURE_DATA,MAP_DATA,TILE_MAP_DATA_1,TILE_MAP_DATA_2,TILE_SPRITE_SHEET] );
    }

    override public function prepareEngine() {

        mainEngine = new Engine();

        // factory = new EntityFactory(tm);

        EntityFactory.instance = new EntityFactory();

        mainEngine.registerComponent(engine.components.Physics,5);
        mainEngine.registerComponent(engine.components.Display,2);
        mainEngine.registerComponent(engine.components.CameraController,1);

        mainEngine.addSystem(new PhysicsSystem(worldData));
        mainEngine.addSystem(new EntityUpdater(mainEngine.entities));
        mainEngine.addSystem(new InputSystem(digitalInput,camera));
        mainEngine.addSystem(new ParticleSystem(blockParticleEngine));
        mainEngine.addSystem(new RenderSystem(camera,itemContainer,tm));

        // mainEngine.addSystem(new PhysicsSystem(worldData),0);  
        // mainEngine.addSystem(new MotionControlSystem(digitalInput),1);
        // mainEngine.addSystem(new PlayerSystem(digitalInput,factory),1);
        // mainEngine.addSystem(new CameraControlSystem(view.camera), 4);
        // mainEngine.addSystem(new RenderSystem( itemContainer ), 5);
        // mainEngine.addSystem(new ParticleSystem( blockParticleEngine ), 6);

        // mainEngine.addSystem(new DebugRenderSystem( view.debugRenderer ), 6);

        createEntities();

        gameLoop.updateFunc = tick;
        gameLoop.start();

    }

    public function createEntities() {
        mainEngine.addEntity(EntityFactory.instance.create("player",50,50));
        mainEngine.addEntity(Create([new GunTurret(new Vector2D(200,100))]));
        // mainEngine.addEntity(factory.create("enemy",400,100));
    }


    public function tick(time:Float) {
        //digitalInput.Update(-camera.position.x,-camera.position.y);
        mainEngine.update(time);

        // blockParticleEngine.EmitParticle(100,100,utils.Random.RandomFloat(-100,100),utils.Random.RandomFloat(-100,100),0,0,800,0.95,true,false,null,4,255,255,255,255);
        // blockParticleEngine.Update();
        //pointParticleEngine.EmitParticle(100,100,0,0,0,0,10000,1,false,false,null,0,64,64,0,0);
        // pointParticleEngine.EmitParticle(100,100,utils.Random.RandomFloat(-10,10),utils.Random.RandomFloat(-10,10),0,0,10000,1,false,false,null,0,64,64);
        //pointParticleEngine.Update();

        view.renderer.Render(view.camera.viewPortAABB);
        // lightGrid.renderLightGrid();
        // lightGrid.draw();
    }

    override public function preInit() {

        digitalInput = new DigitalInput();
        digitalInput.InputTarget(Browser.document);

        tmxMap = new TmxMap(assets.assets.get(MAP_DATA));
        tmxMap.tilesets[0].set_image(assets.assets.get(TILE_SPRITE_SHEET));
        worldData = new WorldData(32,tmxMap,"Tile Layer 1");

        camera = new Camera();
        camera.worldExtentsAABB = new wgr.geom.AABB( worldData.worldBounds.t , worldData.worldBounds.r , worldData.worldBounds.b , worldData.worldBounds.l );
        camera.worldExtentsAABB.shrink(worldData.tileSize);

        view = new View(800,600,camera,false);
    }

    override public function prepareRenderer() {

        mapData = engine.map.tmx.TmxLayer.layerToCoordTexture(tmxMap.getLayer("Tile Layer 1"));

        tm  = new TextureManager(view.renderer.gl);
        tm.AddTexture(TEXTURE_DATA, assets.assets.get(TEXTURE_DATA) );
        tm.ParseTexturePackerJSON( assets.assets.get(TEXTURE_CONFIG) , TEXTURE_DATA );

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

        // pointParticleEngine = new PointSpriteParticleEngine(14000,1000/60);
        //     pointParticleEngine.renderer.SetSpriteSheet(tileMap.spriteSheet,16,8,8);
        //     view.renderer.AddRenderer(pointParticleEngine.renderer);

        blockParticleEngine = new BlockSpriteParticleEngine(4000,1000/60);
            view.renderer.AddRenderer(blockParticleEngine.renderer);

        itemContainer = new DisplayObjectContainer();
            itemContainer.id = "itemContainer";
            view.camera.addChild(itemContainer);
    }

}