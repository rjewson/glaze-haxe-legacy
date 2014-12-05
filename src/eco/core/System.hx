
package eco.core;

class System 
{

    public var engine:Engine;

    public var registeredComponents (get, null):Array<Class<Component>>;

    public function new () {
    }

    public function get_registeredComponents ():Array<Class<Component>> {
        return [];
    }

    public function onAdded(engine:Engine) {
        this.engine = engine;
    }

    public function onRemoved() {

    }

    public function componentAdded(e:Entity,c:Class<Component>) {
    }

    public function componentRemoved(e:Entity,c:Class<Component>) {
    }

    public function update(time:Float) {
    }

}