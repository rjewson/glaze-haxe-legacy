
package engine.systems;

import ash.tools.ListIteratingSystem;
import engine.components.MotionControls;
import engine.components.Physics;
import engine.components.Position;
import engine.input.DigitalInput;
import engine.nodes.MotionControlNode;
import physics.geometry.Vector2D;

class MotionControlSystem extends ListIteratingSystem<MotionControlNode>
{

    private var input:DigitalInput;

    private var left:Bool;
    private var right:Bool;
    private var up:Bool;
    private var down:Bool;

    private var force:Vector2D;

    public function new (input:DigitalInput) {
        super(MotionControlNode,updateNode);
        this.input = input;
        force = new Vector2D();
    }

    private function updateNode(node:MotionControlNode, time:Float):Void {
        var control:MotionControls = node.controls;
        var position:Position = node.position;
        var physics:Physics = node.physics;

        left = input.Pressed(65);
        right = input.Pressed(68);
        up = input.Pressed(87);
        down = input.Pressed(83);

        force.setTo(0,0);

        force.x -= left ? 10 : 0;
        force.x += right ? 10 : 0;

        force.y -= up ? 50 : 0;
        force.y += down ? 10 : 0;

        physics.body.AddForce( force );

    }

}