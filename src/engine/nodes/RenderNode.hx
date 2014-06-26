
package engine.nodes;

import ash.core.Node;
import engine.components.Display;
import engine.components.Position;
import wgr.display.DisplayObject;

class RenderNode extends Node<RenderNode>
{

    public var position:Position;
    private var display:Display;
    
    public var displayObject(get_displayObject, never):DisplayObject;

    private inline function get_displayObject():DisplayObject
    {
        return display.displayObject;
    }
}