
package game;

import engine.core.Component;

class Cat extends Component
{

    public function new() {
        this.name = "Cat";
    }

    public function meeew() {
        trace("meew");
    }

}