package engine.ai.steering.behaviours;
import engine.ai.steering.SteeringBehavior;
import physics.dynamics.Body;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class Behavior 
{
	public var weight : Float;
	// Amount the final force will be scaled by
	public var probability : Float;
	// Probability this will be calculated in prioritized dithering
	public var priority : Int;
	// Order in which this will be calculated vs other behaviors
	public var agent : Body;
	
	public var steering:SteeringBehavior;
		
	public function new(a_weight : Float = 1.0, a_priority : Int = 1, a_probability : Float = 1) 
	{
		this.weight = a_weight;
		this.priority = a_priority;
		this.probability = a_probability;
	}
	
	public function calculate() : Vector2D {
		return null;
	}	
	
}