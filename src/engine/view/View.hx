
package engine.view;

import js.Browser;
import js.html.CanvasElement;
import wgr.display.Camera;
import wgr.display.Stage;
import wgr.renderers.canvas.CanvasDebugView;
import wgr.renderers.webgl.WebGLRenderer;

class View 
{
    public var stage:Stage;
    public var camera:Camera;
    public var renderer:WebGLRenderer;
    public var canvasView:CanvasElement;
    public var debugView:CanvasElement;
    public var debugRenderer:CanvasDebugView;

    public function new(width:Int,height:Int,debug:Bool) {
        this.stage = new Stage();
        this.camera = new Camera();
        this.stage.addChild(camera);

        this.canvasView = cast(Browser.document.getElementById("view"),CanvasElement);
        this.renderer = new WebGLRenderer(stage,camera,canvasView,width,height);

        this.debugView = cast(Browser.document.getElementById("viewDebug"),CanvasElement);
        this.debugRenderer = new CanvasDebugView(debugView,camera,width,height);

        camera.worldExtentsAABB = new wgr.geom.AABB(0,2000,2000,0);
        camera.Resize(renderer.width,renderer.height);
    }

    

}