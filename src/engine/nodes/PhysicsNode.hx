
package engine.nodes;

import ash.core.Node;
import engine.components.Collision;
import engine.components.Motion;
import engine.components.Position;

class PhysicsNode extends Node<PhysicsNode>
{

    public var collision:Collision;
    public var position:Position;
    public var motion:Motion;

}