package physics.dynamics;

/**
 * ...
 * @author rje
 */

class BodyContact 
{

	public var bodyA:Body;
	public var bodyB:Body;
	
	public var hash:Int;
	
	public var stamp:Int;
	
	public var startContact:Bool;
	public var endContact:Bool;
	
	public var contactCount : Int;
	
	public function new() 
	{
		
	}
	
}