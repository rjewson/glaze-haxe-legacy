package physics.geometry;
import physics.dynamics.Feature;

/**
 * ...
 * @author rje
 */

class GeometricShape 
{
	
	public var typeID:Int;
	
	public var offset:Vector2D;
	
	public var aabb:AABB;
	
	public var area : Float;
		
	public function new(typeID:Int, offset:Vector2D) 
	{
		this.typeID = typeID;
		this.offset = offset;
		aabb = new AABB();
	}
	
	public function Update(rotation : Vector2D) : Void {
	}
	
	public function ContainsPoint(point : Vector2D, shapePosition:Vector2D) : Bool {
		return false;
	}
	
	public function IntersectRay(ray : Ray, feature:Feature) : Bool {
		return false;
	}
	
	public function IntersectSegment(a:Vector2D, b:Vector2D, feature:Feature) {
		
	}
	
}