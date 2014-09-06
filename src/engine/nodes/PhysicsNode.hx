
package engine.nodes;

import ash.core.Node;

import engine.components.Physics;
import engine.components.Position;

class PhysicsNode extends Node<PhysicsNode>
{

    public var position:Position;
    public var physics:Physics;

}