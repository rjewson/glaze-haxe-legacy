
package eco.core;

import eco.core.Entity;

@:autoBuild(eco.core.ComponentBuilder.build())
@:componentBase

class Component {

    public var owner:Entity = null;
    public var name (get, null):String;
    public var started:Bool = false;
    public var priority:Int;

    public function onAdded() {
    }

    public function onRemoved() {
    }

    public function onStarted() {
        
    }

    public function update(time:Float) {
    }

    private function get_name ():String {
        return null;
    }

}