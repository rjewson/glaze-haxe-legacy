
package engine.components;

import eco.core.Component;
import engine.ai.steering.behaviours.Seek;
import engine.ai.steering.SteeringBehavior;
import engine.components.Physics;
import engine.components.Position;
import physics.dynamics.Body;
import physics.geometry.Vector2D;

class Steering extends Component
{

    public var body:Body;
    public var position:Position;

    public var maxSteeringForcePerStep:Float;
    public var maxAcceleration:Float;

    public var steeringBehaviour:SteeringBehavior;

    public function new() {
        maxSteeringForcePerStep = 5;
        maxAcceleration = 1;
    }

    override public function onAdded() {
        this.position = cast owner.getComponentByClass(Position);
        this.body = (cast owner.getComponentByClass(Physics)).body;
        this.steeringBehaviour = new SteeringBehavior(this.body);
        this.steeringBehaviour.addBehavior(new Seek(new Vector2D(100,100)));
    }

    override public function update(time:Float) {
        body.AddForce(steeringBehaviour.calculate());
    }

}