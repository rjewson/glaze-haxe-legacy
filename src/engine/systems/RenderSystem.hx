
package engine.systems;

import eco.core.Component;
import eco.core.Entity;
import eco.core.System;
import engine.components.CameraController;
import engine.components.Display;
import engine.components.Position;
import wgr.display.Camera;
import wgr.display.DisplayObjectContainer;
import wgr.display.Sprite;
import wgr.texture.TextureManager;

class RenderSystem extends System
{

    public var container:DisplayObjectContainer;
    public var camera:Camera;
    public var cameraPosition:Position;
    public var textureManager:TextureManager;

    public function new(camera:Camera,container:DisplayObjectContainer,textureManager:TextureManager) {
        super();
        this.camera = camera;
        this.container = container;
        this.textureManager = textureManager;
    }

    override public function get_registeredComponents ():Array<Class<Component>> {
        return [Display,CameraController];
    }

    override public function componentAdded(e:Entity,c:Class<Component>) {
        if (c==Display) {
            var display:engine.components.Display = cast e.getComponentByClass(c);
            display.displayObject = createSprite(display.id,display.tid);
            container.addChild(display.displayObject);
        } else if (c==CameraController) {
            var camera:CameraController = cast e.getComponent("CameraController");
            cameraPosition = camera.getPosition();
        }
    }

    override public function componentRemoved(e:Entity,c:Class<Component>) {
        if (c==Display) {
            var display:engine.components.Display = cast e.getComponentByClass(c);
            container.removeChild(display.displayObject);
        }
    }

    override public function update(time:Float) {
        camera.Focus(cameraPosition.position.x,cameraPosition.position.y);
    }

    private function createSprite(id:String,tid:String) {
        var s = new Sprite();
        s.id = id;
        s.texture = textureManager.textures.get(tid);
        s.position.x = 0;
        s.position.y = 0;
        s.pivot.x = s.texture.frame.width * s.texture.pivot.x;
        s.pivot.y = s.texture.frame.height * s.texture.pivot.y;
        return s;
    }

}