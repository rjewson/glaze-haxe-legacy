package engine.ai.steering.behaviours;
import engine.ai.steering.SteeringSettings;
import physics.dynamics.Body;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class Seek extends Behavior
{

	public var target : Vector2D;
	public var seekDistSq : Float;

	public static var wanderResult:Vector2D = new Vector2D();

	public function new(target : Vector2D, seekDistSq : Float = 0) {
		super(SteeringSettings.seekWeight, SteeringSettings.seekPriority);
		
		this.target = target;
		this.seekDistSq = seekDistSq;
	}

	override public function calculate() : Vector2D {
		return calc(agent, target, seekDistSq);
	}

	//Hand optimized as called so often
	public static inline function calc(agent : Body, target : Vector2D, seekDistSq : Float = 0) : Vector2D {
		
		//var wanderResult:Vector2D = new Vector2D();
		
		var dX:Float = target.x - agent.averageCenter.x;
		var dY:Float = target.y - agent.averageCenter.y;
		var d:Float = dX * dX + dY * dY;
		
		if (seekDistSq < 0 && d < -seekDistSq) {
			return wanderResult;
		} else if (seekDistSq > 0 && d > seekDistSq) {
			return wanderResult;
		} else {
			//var desired = target.minus(agent.averageCenter);
			//desired.unitEquals();
			//desired.multEquals(agent.maxVelocityScalar);
			//desired.minusEquals(agent.GetVelocity());
			//return desired;
			var t = Math.sqrt(d);
			
			wanderResult.x = dX / t;
			wanderResult.x *= 5;//agent.maxSteeringForcePerStep;
			wanderResult.x -= agent.position.x - agent.prevPosition.x;
			
			wanderResult.y = dY / t;
			wanderResult.y *= 5;//agent.maxSteeringForcePerStep;
			wanderResult.y -= agent.position.y - agent.prevPosition.y;
			
			return wanderResult;
		}
	}
	
}