package physics.collision.broadphase.action;
import physics.dynamics.Body;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class ActionParams 
{

	public var position:Vector2D;
	public var queryBody:Body;
	public var radius:Float;
	public var radiusSqrd:Float;
	
	public var filterResultsA:Bool;
	
	public function new() 
	{
		
	}

	public function PreProcess():Void {
		radiusSqrd = radius * radius;
	}
	
}