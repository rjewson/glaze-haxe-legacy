
package engine.nodes;

import ash.core.Node;
import engine.components.Collision;
import engine.components.DebugDisplay;
import engine.components.Position;

class DebugRenderNode extends Node<DebugRenderNode>
{

    public var position:Position;
    public var collision:Collision;
    private var debugDisplay:DebugDisplay;
    
}