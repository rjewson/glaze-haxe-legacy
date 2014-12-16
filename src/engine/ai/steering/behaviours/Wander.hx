package engine.ai.steering.behaviours;
import engine.ai.steering.SteeringSettings;
import physics.geometry.Vector2D;
import util.Random;

/**
 * ...
 * @author rje
 */

class Wander extends Behavior
{
	public var circleRadius : Int;
	public var circleDistance : Int;
	// the radius of the circle
	public var wanderAngle : Float;
	// the change to the current direction. Produces sustained turned, keeps it from being jerky. Makes it smooth
	public var wanderChange : Float;

	public function new() 
	{
		super(SteeringSettings.wanderWeight, SteeringSettings.wanderPriority);
		circleRadius = 25;
		circleDistance = 30;
		wanderAngle = Random.RandomFloat(0, Math.PI * 2);
		wanderChange = 0.3;
	}

	public override function calculate() : Vector2D {
		
		wanderAngle += Random.RandomFloat( -wanderChange, wanderChange);
		var v:Vector2D = agent.GetVelocity();
		var circleLoc:Vector2D = v.clone();
		circleLoc.unitEquals();
		circleLoc.multEquals(circleDistance);
		circleLoc.plusEquals(agent.position);
				
		var h:Float = -Math.atan2(-v.y, v.x);
		
		var circleOffset:Vector2D = new Vector2D(circleRadius * Math.cos(wanderAngle + h), circleRadius * Math.sin(wanderAngle + h));
		var target = circleLoc.plus(circleOffset);

		return Seek.calc(agent, target);
	}
	
}