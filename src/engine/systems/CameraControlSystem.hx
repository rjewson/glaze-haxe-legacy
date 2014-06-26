
package engine.systems;

import ash.tools.ListIteratingSystem;
import engine.components.Position;
import engine.nodes.CameraControlNode;
import wgr.display.Camera;

class CameraControlSystem extends ListIteratingSystem<CameraControlNode>
{

    private var camera:Camera;

    public function new (camera:Camera) {
        super(CameraControlNode,updateNode);
        this.camera = camera;
    }

    private function updateNode(node:CameraControlNode, time:Float):Void {
        //var camera:Camera = node.camera;
        var position:Position = node.position;
        camera.Focus(position.position.x,position.position.y);

    }
}