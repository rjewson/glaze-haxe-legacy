
package game.exile.entities;

import ash.core.Entity;
import engine.components.Camera;
import engine.components.DebugDisplay;
import engine.components.Display;
import engine.components.MotionControls;
import engine.components.Particle;
import engine.components.Physics;
import engine.components.Position;
import game.exile.components.Player;
import physics.geometry.Polygon;
import physics.geometry.Vector2D;
import wgr.display.Sprite;
import wgr.texture.TextureManager;

class EntityFactory 
{

    public var tm:TextureManager;

    public function new(tm:TextureManager) {
        this.tm = tm;
    }

    public function create(name:String,x:Float,y:Float):Entity {
        switch (name) {
            case "player":
                var spr = createSprite("character","character1.png");
                // spr.scale.x = -1;
                var player = new Entity()
                    .add(new Player())
                    .add(new Position(0,0,0))
                    .add(new Physics(x,y,1,1,[new Polygon(Polygon.CreateRectangle(30,72),new Vector2D(0,0))]))
                    .add(new Display(spr))
                    .add(new DebugDisplay())
                    .add(new MotionControls())
                    .add(new Camera());
                var physics:Physics = player.components.get(Physics);
                    physics.body.group = 1;
                return player;
            case "enemy":
                var spr = createSprite("character","character2.png");
                spr.scale.x = -1;
                var enemy = new Entity()
                    .add(new Position(0,0,0))
                    .add(new Physics(x,y,1,1,[new Polygon(Polygon.CreateRectangle(30,72),new Vector2D(0,0))]))
                    .add(new Display(spr))
                    .add(new DebugDisplay());
                return enemy;
            case "projectile":
                var spr = createSprite("character","projectile1.png");
                // spr.scale.x = 2;
                // spr.scale.y = 2;
                var enemy = new Entity()
                    .add(new Position(0,0,0))
                    .add(new Physics(x,y,0,0,[new Polygon(Polygon.CreateRectangle(16,16),new Vector2D(0,0))]))
                    .add(new Display(spr))
                    .add(new Particle());
                return enemy;

        }
        return null;
    }

    private function createSprite(id:String,tid:String) {
        var s = new Sprite();
        s.id = id;
        s.texture = tm.textures.get(tid);
        s.position.x = 0;
        s.position.y = 0;
        s.pivot.x = s.texture.frame.width * s.texture.pivot.x;
        s.pivot.y = s.texture.frame.height * s.texture.pivot.y;
        return s;
    }

}