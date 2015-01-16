
package game.exile.components;

import eco.core.Component;
import eco.core.Entity;
import engine.components.CameraController;
import engine.components.Controls;
import engine.components.Display;
import engine.components.Holder;
import engine.components.Physics;
import engine.components.Position;
import engine.components.Script;
import engine.input.DigitalInput;
import game.exile.components.ProjectileA;
import game.exile.entities.EntityFactory;
import physics.dynamics.Body;
import physics.geometry.Polygon;
import physics.geometry.Vector2D;

class Player extends Component
{

    private var left:Int;
    private var right:Int;
    private var up:Int;
    private var down:Int;
    private var hold:Bool;
    private var trigger:Bool;

    private var movementForce:Vector2D;

    private var position:Position;
    private var controls:Controls;
    private var physics:Physics;
    private var holder:Holder;

    private var force:Vector2D;

    public function new() {
        force = new Vector2D();
    }                

    override public function onAdded() {
        owner.name = "Player";

        position = new Position(100,100,0);
        controls = new Controls();
        physics = new Physics(50,50,0,0,
            [
            new Polygon(Polygon.CreateRectangle(30,72),new Vector2D(0,0))
            ]);
        physics.body.features[0].categoryBits = game.exile.entities.Filters.PLAYER_CATEGORY;
        holder = new Holder(32,70,0,0);

        owner
            .add(position)
            .add(physics)
            .add(new Display("character","character1.png"))
            .add(new CameraController())
            .add(controls)
            .add(holder);
    }

    override public function onStarted() {

    }

    override public function update(time:Float) {
        processInputs();
    }

    private function processInputs() {
        left = controls.digitalInput.PressedDuration(65);
        right = controls.digitalInput.PressedDuration(68);
        up = controls.digitalInput.PressedDuration(87);
        down = controls.digitalInput.PressedDuration(83);
        holder.hold = controls.digitalInput.Pressed(77);
        if (controls.digitalInput.Pressed(78)) {
            holder.releaseBody();
        }

        force.setTo(0,0);

        force.x -= left>0 ? 10 : 0;
        force.x += right>0 ? 10 : 0;

        force.y -= up>0 ? 50 : 0;
        force.y += down>0 ? 10 : 0;

        physics.body.AddForce( force );

        if (controls.digitalInput.JustPressed(200)) {

            var viewPos = controls.digitalInput.mousePosition.plus(controls.digitalInput.mouseOffset);
            var startVelocity = viewPos.minusEquals(position.position).unitEquals().multEquals(15);

            // var projectile = new Entity();
            // projectile.add(new ProjectileA( position.position , startVelocity ));
            // owner.engine.addEntity(projectile);

            owner.engine.addEntity(Entity.Create([new ProjectileA( position.position , startVelocity, 1)]));
        }
    }

}