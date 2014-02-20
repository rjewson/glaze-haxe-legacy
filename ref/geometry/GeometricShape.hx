package physics.geometry;
import physics.dynamics.Feature;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class GeometricShape 
{

	public static var nextUID:Int = 0;
	
	public var typeID:Int;
	
	public var offset:Vector2D;
	
	public var aabb:AABB;
	
	public var area : Float;
	
	public var UID:Int;
	
	public function new(typeID:Int, offsetX:Float = 0,offsetY:Float = 0) 
	{
		this.typeID = typeID;
		this.offset = new Vector2D(offsetX,offsetY);
		aabb = new AABB();
		UID = nextUID++;
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