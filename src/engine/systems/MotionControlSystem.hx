
package engine.systems;

import ash.tools.ListIteratingSystem;
import engine.components.Motion;
import engine.components.MotionControls;
import engine.components.Position;
import engine.input.DigitalInput;
import engine.nodes.MotionControlNode;

class MotionControlSystem extends ListIteratingSystem<MotionControlNode>
{

    private var input:DigitalInput;

    public function new (input:DigitalInput) {
        super(MotionControlNode,updateNode);
        this.input = input;
    }

    private function updateNode(node:MotionControlNode, time:Float):Void {
        var control:MotionControls = node.controls;
        var position:Position = node.position;
        var motion:Motion = node.motion;

        var delta = motion.onGround ? 4.0 : 2;

        if (input.Pressed(65)) {
            motion.forces.x-=delta;
        }

        if (input.Pressed(68)) {
            motion.forces.x+=delta;
        }

        if (motion.onGround&&input.JustPressed(87)) {
            motion.forces.y-=delta*4;
        }
        if (input.Pressed(83)) {
            motion.forces.y+=delta;
        }

    }

}