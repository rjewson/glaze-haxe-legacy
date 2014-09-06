package physics.geometry;

/**
 * ...
 * @author rje
 */

class Axis 
{

	public var n:Vector2D;
	
	public var d:Float;
	
	public function new(n,d) 
	{
		this.n = n;
		this.d = d;
	}
	
	public function clone() : Axis {
		return new Axis(n.clone(), d);
	}
	
}