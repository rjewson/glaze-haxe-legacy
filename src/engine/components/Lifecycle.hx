
package engine.components;

import eco.core.Component;

typedef LifecycleEvent = {
    var age:Float;
}

class Lifecycle extends Component
{

    public var ttl:Float;
    public var age:Float;
    public var expired:Bool;

    public function new(ttl:Float) {
        this.ttl = ttl;
        this.age = 0;
        this.expired = false;
    }

   override public function update(time:Float) {
        age += time;
        if (!expired && age>=ttl) {
            owner.events.dispatch( "lc" , {age:age} );
            expired = true;
        }
    }    

}