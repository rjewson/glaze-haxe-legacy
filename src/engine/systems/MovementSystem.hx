
package engine.systems;

import ash.tools.ListIteratingSystem;
import engine.components.Motion;
import engine.components.Position;
import engine.nodes.MovementNode;

class MovementSystem extends ListIteratingSystem<MovementNode>
{

    public function new () {
        super(MovementNode,updateNode);
    }

    private function updateNode(node:MovementNode, time:Float):Void {
        // var position:Position = node.position;
        // var motion:Motion = node.motion;

        // position = node.position;
        // motion = node.motion;

        // motion.delta.copy(motion.velocity);

        // position.position.x += motion.velocity.x;
        // position.position.y += motion.velocity.y;

        // motion.velocity.x *= motion.damping;
        // motion.velocity.y *= motion.damping;

        // motion.velocity.clampMax(2);

    }

}