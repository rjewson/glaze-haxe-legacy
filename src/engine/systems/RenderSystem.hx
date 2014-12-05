
package engine.systems;

import eco.core.Component;
import eco.core.Entity;
import eco.core.System;
import engine.components.CameraController;
import engine.components.Display;
import engine.components.Position;
import wgr.display.Camera;
import wgr.display.DisplayObjectContainer;

class RenderSystem extends System
{

    public var container:DisplayObjectContainer;
    public var camera:Camera;
    public var cameraPosition:Position;

    public function new(camera:Camera,container:DisplayObjectContainer) {
        super();
        this.camera = camera;
        this.container = container;
    }

    override public function get_registeredComponents ():Array<Class<Component>> {
        return [Display,CameraController];
    }

    override public function componentAdded(e:Entity,c:Class<Component>) {
        if (c==Display) {
            var display:engine.components.Display = cast e.getComponentByClass(c);
            container.addChild(display.displayObject);
        } else if (c==CameraController) {
            var camera:CameraController = cast e.getComponent("CameraController");
            cameraPosition = camera.getPosition();
        }
    }

    override public function componentRemoved(e:Entity,c:Class<Component>) {
        trace("removed");
    }

    override public function update(time:Float) {
        camera.Focus(cameraPosition.position.x,cameraPosition.position.y);
    }

}