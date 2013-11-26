
package engine.core;

import ds.DLL;
import engine.core.Component;
import engine.core.EntityManager;

class System implements DLLNode<System>
{

    public var componentInterest:String;

    public var prev:System;
    public var next:System;

    private var maanger:EntityManager;

    public function new() {

    }

    public function onAddedToManager(manager:EntityManager) {
        this.maanger = manager;
    }

    public function onRemovedFromManager() {
        this.maanger = null;
    }

    public function onComponentAdded(component:Component) {
    }

    public function onComponentRemoved(component:Component) {
    }

    public function update(dt:Float) {

    }

}