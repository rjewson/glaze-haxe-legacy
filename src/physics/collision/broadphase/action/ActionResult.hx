package physics.collision.broadphase.action;
import physics.dynamics.Body;

/**
 * ...
 * @author rje
 */

class ActionResult 
{

	public var body:Body;
	public var distanceSqrd:Float;
	
	public function new() 
	{
		
	}
	
	inline public function Reset():Void {
		body = null;
		distanceSqrd = 0;
	}
	
}