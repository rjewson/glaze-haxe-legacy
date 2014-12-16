package engine.ai.steering;
import engine.ai.steering.behaviours.Behavior;
import physics.dynamics.Body;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class SteeringBehavior 
{
	public static inline var CALCULATE_SUM : Int = 0;
	// Simply adds up all of the behaviors and truncates them to the max acceleration
	public static inline var CALCULATE_SPEED : Int = 1;
	// Prioritized Dithering
	public static inline var CALCULATE_ACCURACY : Int = 2;
	// Weighted Truncated Running Sum with Prioritization
	public var behaviors : Array<Behavior>;
	public var neighbors : Array<Body>;
	
	public var calculateMethod : Int;
	private var hasChanged : Bool;
	private var hasGroupBehavior : Bool;
	private var force : Vector2D;
	private var agent : Body;
		
	public function new(a_agent : Body, a_calculationMethod : Int = CALCULATE_ACCURACY) 
	{
		calculateMethod = a_calculationMethod;
		agent = a_agent;
		force = new Vector2D();
		behaviors = new Array<Behavior>();
		//neighbors = new Array<Body>();
	}

	public function addBehavior(behavior : Behavior) : Void {
		behaviors.push(behavior);
		behavior.agent = agent;
		behavior.steering = this;
		hasChanged = true;
		//if ( behavior is IGroupBehavior ) hasGroupBehavior = true;
	}
	
	public function removeBehaviour(behavior : Behavior) : Void {
		var i = 0;
		for (item in behaviors) {
			if (item == behavior) {
				behaviors.splice(i, 1);
				return;
			}
			i++;
		}
	}
	
	public function calculate() : Vector2D {
		if ( hasChanged ) {
			sort();
			hasChanged = false;
		}
		force.x = 0;
		force.y = 0;
		// FIXME
		// if ( m_hasGroupBehavior ) {
		// neighbors = [];
		// var dist : Number = m_agent.neighborDistance * m_agent.neighborDistance;
		// for each ( var entity:Entity in m_agent.parent.getChildren() ) {
		// if ( entity is Boid && entity.actualPos.distanceSqTo(m_agent.actualPos) < dist ) {
		// neighbors.push(entity);
		// }
		// }
		// }

		switch( calculateMethod ) {
			case CALCULATE_SUM:
				runningSum();
			case CALCULATE_SPEED:
				prioritizedDithering();
			case CALCULATE_ACCURACY:
				wtrsWithPriorization();
		}

		return force;
	}

	private function prioritizedDithering() : Void {
		for (behavior in behaviors) {
			if ( Math.random() < behavior.probability ) {
				force.plusEquals(behavior.calculate().mult(behavior.weight));
			}

			if ( !force.equalsZero() ) {
				force.clampMax(agent.maxAcceleration);
				return;
			}
		}
	}

	private function wtrsWithPriorization() : Void {
		for (behavior in behaviors) {
			if ( !accumulateForce(force, behavior.calculate().mult(behavior.weight))) 
				return;
		}
	}

	private function runningSum() : Void {
		for (behavior in behaviors) {
			force.plusEquals(behavior.calculate().mult(behavior.weight));
		}
		force.clampMax(agent.maxAcceleration);
	}

	private function accumulateForce(a_runningTotal : Vector2D, a_forceToAdd : Vector2D) : Bool {
		var magnitudeSoFar : Float = a_runningTotal.length();
		var magnitudeRemaining : Float = agent.maxAcceleration - magnitudeSoFar;
		if ( magnitudeRemaining <= 0 ) 
			return false;

		var magnitudeToAdd : Float = a_forceToAdd.length();

		if ( magnitudeToAdd < magnitudeRemaining ) {
			a_runningTotal.x += a_forceToAdd.x;
			a_runningTotal.y += a_forceToAdd.y;
			return true;
		} else {
			a_runningTotal.plusEquals(a_forceToAdd.unit().multEquals(magnitudeRemaining));
			return false;
		}
	}
	
	private function sort() : Void {
		behaviors.sort(behaviorsCompare);
	}

	private function behaviorsCompare(a : Behavior, b : Behavior) : Int {
		if ( a.priority < b.priority ) return -1;
		if ( a.priority == b.priority ) return 0;
		return 1;
	}
	
}