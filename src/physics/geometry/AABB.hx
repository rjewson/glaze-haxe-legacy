package physics.geometry;
import physics.Constants;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class AABB 
{

	public var l : Float; //minX
	public var b : Float; //minY
	public var r : Float; //maxX
	public var t : Float; //maxY
	
	public function new(?l=.0,?b=.0,?r=.0,?t=.0) 
	{
		this.l = l;
		this.b = b;
		this.r = r;
		this.t = t;
	}
	
	inline public static function intersects(aabb1:AABB, position1:Vector2D, aabb2:AABB, position2:Vector2D):Bool {
		if (aabb1.l + position1.x > aabb2.r + position2.x)
			return false;
		else if (aabb1.r + position1.x < aabb2.l + position2.x)
			return false;
		else if (aabb1.t + position1.y > aabb2.b + position2.y)
			return false;
		else if (aabb1.b + position1.y < aabb2.t + position2.y)
			return false;
		else return true;
	}

	inline public function containtsPoint(point:Vector2D) {
		return ( point.x >= l && point.x < r && point.y >= t && point.y < b ); 
	}

	inline public function expand(aabb : AABB) : Void {
		if (aabb.l < this.l) this.l = aabb.l;
		if (aabb.r > this.r) this.r = aabb.r;
		if (aabb.t < this.t) this.t = aabb.t;
		if (aabb.b > this.b) this.b = aabb.b;
	}
	
	inline public function reset() : Void {
		l = Constants.FMAX; 
		r = -Constants.FMAX; 
		t = Constants.FMAX; 
		b = -Constants.FMAX; 
	}
	
	inline public function width():Float {
		return r - l;
	}	
	
	inline public function height():Float {
		return b - t;
	}
	
	inline public function area():Float {
		return width()*height();
	}
	
	inline public function setToCenter(c:Vector2D):Void {
		c.x = (r + l) / 2;
		c.y = (b + t) / 2;
	}

	inline public function Union(position:Vector2D, aabb:AABB, aabbPosition:Vector2D):AABB {
		return new AABB(
			Math.max(this.l+position.x, aabb.l+aabbPosition.x),
			Math.min(this.b+position.y, aabb.b+aabbPosition.y),
			Math.min(this.r+position.x, aabb.r+aabbPosition.x),
			Math.max(this.t+position.y, aabb.t+aabbPosition.y));
	}
	
}