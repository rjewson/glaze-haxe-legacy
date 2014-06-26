
package engine.systems;

import ash.core.Engine;
import ash.core.NodeList;
import ash.core.System;
import engine.components.Collision;
import engine.components.Position;
import engine.nodes.DebugRenderNode;
import engine.nodes.RenderNode;
import geom.Vector2D;
import wgr.display.DisplayObject;
import wgr.display.DisplayObjectContainer;
import wgr.renderers.canvas.CanvasDebugView;

class DebugRenderSystem extends System
{

    public var view:CanvasDebugView;

    private var nodes:NodeList<DebugRenderNode>;

    public function new(view:CanvasDebugView) {
        super();
        this.view = view;
    }

    override public function addToEngine(engine:Engine):Void {
        nodes = engine.getNodeList(DebugRenderNode);
    }

    override public function update(time:Float):Void {
        view.Clear();    
        for (node in nodes)
        {
            var position:Vector2D = node.position.position;
            var collision:Collision = node.collision;
            //view.DrawRect(position.x,position.y,10,10);
            view.DrawCross(position.x,position.y,10);
            view.DrawRect(position.x-collision.aabb.extents.x,position.y-collision.aabb.extents.y,collision.aabb.extents.x*2,collision.aabb.extents.y*2);
        }
    }

    override public function removeFromEngine(engine:Engine):Void {
        nodes = null;
    }
}