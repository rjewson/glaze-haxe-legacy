package physics.dynamics;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class Contact 
{

	public var point : Vector2D;

	public var normal : Vector2D;

	public var penDist : Float;
	
	public function new() 
	{
		point = new Vector2D();
		normal = new Vector2D();
		penDist = 0;
	}
	
}