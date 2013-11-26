
package engine.view;

import js.html.CanvasElement;
import wge.renderer.WebGLRenderer;
import wgr.display.Camera;
import wgr.display.Stage;

class View 
{
    public var stage:Stage;
    public var camera:Camera;
    public var render:WebGLRenderer;
    public var canvasView:CanvasElement;
    public var debugView:CanvasElement;

    public function new(width:Int,height:Int,debug:Bool) {
        this.stage = new Stage();
        this.camera = new Camera();
        //camera.worldExtentsAABB = new wgr.geom.AABB(0,2000,2000,0);
        stage.addChild(camera);

        canvasView = cast(Browser.document.getElementById("view"),CanvasElement);
        renderer = new WebGLRenderer(stage,camera,canvasView,width,height);

        debugView = cast(Browser.document.getElementById("viewDebug"),CanvasElement);
        var debug = new CanvasDebugView(debugView,width,height);
    }

}