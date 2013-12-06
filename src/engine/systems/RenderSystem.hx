
package engine.systems;

import engine.components.Sprite;
import engine.core.Component;
import engine.core.System;
import wgr.display.DisplayObjectContainer;

class RenderSystem extends System
{

    public var container:DisplayObjectContainer;

    public function new(container:DisplayObjectContainer) {
        super();
        this.container = container;
        this.componentInterest = engine.components.Sprite.NAME;
    }

    override public function onComponentAdded(component:Component) {
        this.container.addChild(cast(component,Sprite).display);
    }

    override public function onComponentRemoved(component:Component) {
        this.container.removeChild(cast(component,Sprite).display);
    }

    override public function update(dt:Float) {

    }
}