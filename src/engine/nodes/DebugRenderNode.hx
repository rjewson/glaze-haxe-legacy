
package engine.nodes;

import ash.core.Node;
import engine.components.DebugDisplay;
import engine.components.Physics;
import engine.components.Position;

class DebugRenderNode extends Node<DebugRenderNode>
{

    public var position:Position;
    public var physics:Physics;
    private var debugDisplay:DebugDisplay;
    
}