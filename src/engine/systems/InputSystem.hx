
package engine.systems;

import eco.core.Component;
import eco.core.Entity;
import eco.core.System;
import engine.components.Controls;
import engine.input.DigitalInput;
import wgr.display.Camera;

class InputSystem extends System
{

    public var digitalInput:DigitalInput;
    public var camera:Camera;

    public function new(digitalInput:DigitalInput,camera:Camera) {
        super();
        this.digitalInput = digitalInput;
        this.camera = camera;
    }

    override public function get_registeredComponents ():Array<Class<Component>> {
        return [Controls];
    }

    override public function componentAdded(e:Entity,c:Class<Component>) {
        var controls:Controls = cast e.getComponentByClass(c);
        controls.digitalInput = digitalInput;
    }

    override public function componentRemoved(e:Entity,c:Class<Component>) {
        trace("TODO removed controls");
    }

    override public function update(time:Float) {
        digitalInput.Update(-camera.position.x,-camera.position.y);
    }

}