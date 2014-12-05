
package game.exile.components;

import eco.core.Component;
import engine.components.Controls;
import engine.components.Physics;
import engine.input.DigitalInput;
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

    private var controls:Controls;
    private var physics:Physics;

    private var force:Vector2D;

    public function new() {
        force = new Vector2D();
    }

    override public function onAdded() {
    }

    override public function update(time:Float) {

        controls = cast owner.getComponent("Controls");
        physics = cast owner.getComponent("Physics");

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
    }

}