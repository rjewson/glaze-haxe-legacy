
package engine.components;

import engine.core.Component;
import engine.input.DigitalInput;

class KeyboardControls extends Component
{

    public static inline var NAME:String = "Keyboard";

    public var input:DigitalInput;

    public function new( input:DigitalInput ) {
        this.name = NAME;
        this.input = input;
    }

    override public function onUpdate(dt:Float) {
        var physics:engine.components.Physics = cast owner.getComponent(engine.components.Physics.NAME);
        
        var cameraDelta = 6;

        if (input.Pressed(65)) {
            physics.position.x-=cameraDelta;
        }
        if (input.Pressed(68)) {
            physics.position.x+=cameraDelta;
        }
        if (input.Pressed(87)) {
            physics.position.y-=cameraDelta;
        }
        if (input.Pressed(83)) {
            physics.position.y+=cameraDelta;
        }
    }


}