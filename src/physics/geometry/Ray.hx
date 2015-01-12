package physics.geometry;
import physics.dynamics.Feature;
import utils.Maths;

/**
 * ...
 * @author rje
 */

class Ray 
{
	
	inline public static var MAX_RANGE:Float = 1e100;

	public var origin:Vector2D;
	public var target:Vector2D;
	public var direction:Vector2D;
	public var delta:Vector2D;
	
	public var range:Float;
	public var rangeSqr:Float;
	
	public var returnNormal:Bool;

	public var lastIntersectResult:Bool;
	public var lastIntersectDistance:Float;
	public var lastIntersectFeature:Feature;
	
	public var intersectInRange:Bool;
	public var closestIntersectDistance:Float;
	public var closestIntersectNormal:Vector2D;
	public var closestIntersectFeature:Feature;
	
	public function new() {
	}
	
	public function SetParams(origin:Vector2D , target:Vector2D , range:Float):Void {
		this.origin = origin;
		this.target = target;
		
		//direction = target.minus(origin).normalize();
		delta = target.minus(origin);
		var m : Float = delta.length();
		if (m == 0) m = 0.0000001;
		direction = delta.mult(1 / m);

		
		lastIntersectResult = false;
		lastIntersectDistance = 0;
		lastIntersectFeature = null;
		
		intersectInRange = false;
		closestIntersectDistance = Math.POSITIVE_INFINITY;
		closestIntersectFeature = null;
		
		this.range = (range == 0) ? m : range;
		this.rangeSqr = this.range * this.range;			
	}
	
	public function Seen():Bool {
		return (lastIntersectFeature == null) || (lastIntersectDistance >= range);
	}
	
	public function Seen2():Bool {
		return (lastIntersectDistance >= range);
	}
	
	public function Seen3():Bool {
		return (lastIntersectDistance >= range);
	}

	public function TestFeature(feature:Feature):Bool {
		lastIntersectResult = false;  
		return feature.shape.IntersectRay(this, feature);
	}
	
	public function ReportResult( feature:Feature , dist:Float , normal:Vector2D = null ):Bool {
		
		if (dist>=range) {
			lastIntersectResult = false;
			return false;
		}
		intersectInRange = true;
		lastIntersectResult = true;
		lastIntersectDistance = dist;
		lastIntersectFeature = feature;
		
		if (dist < closestIntersectDistance) {
			closestIntersectDistance = dist;
			closestIntersectFeature= feature;
			closestIntersectNormal = normal;
		}
		
		return true;
	}
	
	public function LastIntersectPoint():Vector2D {
		return new Vector2D(origin.x + (direction.x * lastIntersectDistance), origin.y + (direction.y * lastIntersectDistance));
	}
	
	public function ClosestIntersectPoint():Vector2D {
		return new Vector2D(origin.x + (direction.x * closestIntersectDistance), origin.y + (direction.y * closestIntersectDistance));
	}
	
	public function IntersectBoundingCircle(position:Vector2D,radius:Float) : Bool {
		var distX : Float = origin.x - position.x;
		var distY : Float = origin.y - position.y;
		
		var b : Float = distX * direction.x + distY * direction.y;
		if (b > 0) 
			return false;
		
		var d : Float = (radius * radius) - (distX * distX + distY * distY - (b * b));
		if (d < 0) 
			return false;
		
		return true;
	}
	
}