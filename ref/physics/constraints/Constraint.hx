package physics.constraints;
import physics.dynamics.Body;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class Constraint 
{

	public var body1 : Body;
	public var offset1 : Vector2D;
	public var body2 : Body;
	public var offset2 : Vector2D;
	//public var next : Constraint;
	//public var prev : Constraint;
	public var remove : Bool;
	
	public var destroyCallback :  Constraint -> Void;
	
	public function new() 
	{
		
	}

	public function resolve() : Bool {
		return false;
	}
	
	public function Destroy():Void {
		if (destroyCallback != null)
			destroyCallback(this);
		body1.RemoveConstraint(this);
		body2.RemoveConstraint(this);
	}
	
}