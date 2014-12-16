
package game.exile.entities;

import eco.core.Entity;
import engine.components.CameraController;
import engine.components.Controls;
import engine.components.Display;
import engine.components.Lifecycle;
import engine.components.Physics;
import engine.components.Position;
import game.exile.components.Player;
import game.exile.entities.EntityFactory;
import physics.geometry.Polygon;
import physics.geometry.Vector2D;
import wgr.display.Sprite;
import wgr.texture.TextureManager;

class EntityFactory 
{

    public static var instance:EntityFactory;

    public function new() {
    }

    public function create(name:String,x:Float,y:Float):Entity {
        switch (name) {
            case "player":                
                var player = new Entity()
                .add(new Position(100,100,0))
                .add(new Physics(x,y,0,0,[new Polygon(Polygon.CreateRectangle(30,72),new Vector2D(0,0))]))
                .add(new Display("character","character1.png"))
                .add(new CameraController())
                .add(new Lifecycle(1000))
                .add(new Controls())
                .add(new Player());

                player.events.add(function(type:String,data:Dynamic){
                    trace(data);
                });
                var physics:Physics = cast player.getComponentByClass(Physics);
                physics.body.group = 1;
                // spr.scale.x = -1;
                // var player = new Entity()
                //     .add(new Player())
                //     .add(new Position(0,0,0))
                //     .add(new Physics(x,y,1,1,[new Polygon(Polygon.CreateRectangle(30,72),new Vector2D(0,0))]))
                //     .add(new Display(spr))
                //     .add(new DebugDisplay())
                //     .add(new MotionControls())
                //     .add(new Camera());
                // var physics:Physics = player.components.get(Physics);
                //     physics.body.group = 1;
                return player;
            // case "enemy":
            //     var spr = createSprite("character","character2.png");
            //     spr.scale.x = -1;
            //     var enemy = new Entity()
            //         .add(new Position(0,0,0))
            //         .add(new Physics(x,y,1,1,[new Polygon(Polygon.CreateRectangle(30,72),new Vector2D(0,0))]))
            //         .add(new Display(spr))
            //         .add(new DebugDisplay());
            //     return enemy;
            case "projectile":
                // spr.scale.x = 2;
                // spr.scale.y = 2;
                var projectile = new Entity()
                    .add(new Position(0,0,0))
                    .add(new Physics(x,y,0,0,[new Polygon(Polygon.CreateRectangle(16,16),new Vector2D(0,0))]))
                    .add(new Display("character","projectile1.png"));
                    //.add(new Particle());
                return projectile;

        }
        return null;
    }

}