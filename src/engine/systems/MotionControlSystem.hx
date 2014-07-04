
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

    private var left:Bool;
    private var right:Bool;
    private var up:Bool;
    private var down:Bool;


    public function new (input:DigitalInput) {
        super(MotionControlNode,updateNode);
        this.input = input;
    }

    private function updateNode(node:MotionControlNode, time:Float):Void {
        var control:MotionControls = node.controls;
        var position:Position = node.position;
        var motion:Motion = node.motion;

        left = input.Pressed(65);
        right = input.Pressed(68);

        if (motion.onGround) {
            var onGroundForce = 4;
            //left
            if (left) {
                motion.forces.x-=onGroundForce;
            }
            //right
            if (right) {
                motion.forces.x+=onGroundForce;
            }
            //jump
            if (motion.onGround&&input.JustPressed(87)) {
                motion.forces.y-=onGroundForce*4;
            }           
        } else {
            var inAirForce = 2;
            //Going right?
            if (motion.velocity.x>0&&left) {
                motion.forces.x-=inAirForce;
            } else if (motion.velocity.x<0&&right) {
                motion.forces.x+=inAirForce;
            } else {

            }


        }

 

    }

}