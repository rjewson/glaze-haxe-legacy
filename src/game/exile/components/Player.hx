
package game.exile.components;

import eco.core.Component;
import eco.core.Entity;
import engine.components.Controls;
import engine.components.Physics;
import engine.components.Position;
import engine.components.Script;
import engine.input.DigitalInput;
import game.exile.components.ProjectileA;
import game.exile.entities.EntityFactory;
import physics.dynamics.Body;
import physics.geometry.Vector2D;

class Player extends Component
{

    private var left:Bool;
    private var right:Bool;
    private var up:Bool;
    private var down:Bool;
    private var trigger:Bool;

    private var movementForce:Vector2D;

    private var position:Position;
    private var controls:Controls;
    private var physics:Physics;

    private var force:Vector2D;

    public function new() {
        force = new Vector2D();
    }

    override public function onStarted() {
        position = cast owner.getComponentByClass(Position);
        controls = cast owner.getComponentByClass(Controls);
        physics = cast owner.getComponentByClass(Physics);
    }

    override public function update(time:Float) {
        processInputs();
    }

    private function processInputs() {
        left = controls.digitalInput.Pressed(65);
        right = controls.digitalInput.Pressed(68);
        up = controls.digitalInput.Pressed(87);
        down = controls.digitalInput.Pressed(83);

        force.setTo(0,0);

        force.x -= left ? 10 : 0;
        force.x += right ? 10 : 0;

        force.y -= up ? 50 : 0;
        force.y += down ? 10 : 0;

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