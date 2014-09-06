
package engine.nodes;

import ash.core.Node;
import engine.components.MotionControls;
import engine.components.Physics;
import engine.components.Position;

class MotionControlNode extends Node<MotionControlNode>
{

    public var controls:MotionControls;
    public var position:Position;
    public var physics:Physics;
    
}