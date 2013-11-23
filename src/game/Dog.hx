
package game;

import engine.core.Component;

class Dog extends Component
{

    public function new() {
        this.name="Dog";
    }

    override public function onUpdate(dt:Float) {
        trace("here");
        var cat:game.Cat = cast owner.getComponent("Cat");
        cat.meeew();
    }

}