package physics.geometry;
import utils.Maths;

/**
 * ...
 * @author rje
 */

class Vector2D 
{
	
	public var x : Float;
	public var y : Float;

	public function new(x = .0, y = .0) 
	{
		this.x = x;
		this.y = y;
	}
	
	public function setTo(x : Float, y:Float):Vector2D {
		this.x = x;
		this.y = y;
		return this;
	}
	
	public function copy(v : Vector2D) : Void {
		this.x = v.x;
		this.y = v.y;
	}
	
	public function dot(v : Vector2D) : Float {
		return x * v.x + y * v.y;
	}

	public function cross(v : Vector2D) : Float {
		return x * v.y - y * v.x;
	}

	
	//Plus
	public function plus(v : Vector2D) : Vector2D {
		return new Vector2D(x + v.x, y + v.y);
	}

	public function plus2(x : Float, y : Float) : Vector2D {
		return new Vector2D(this.x + x, this.y + y);
	}

	public function plusEquals(v : Vector2D) : Vector2D {
		x += v.x;
		y += v.y;
		return this;
	}
	
	public function plusEquals2(x : Float, y : Float) : Vector2D {
		this.x += x;
		this.y += y;
		return this;
	}

	public function minus(v : Vector2D) : Vector2D {
		return new Vector2D(x - v.x, y - v.y);
	}

	public function minus2(x : Float, y : Float) : Vector2D {
		return new Vector2D(this.x - x, this.y - y);
	}

	public function minusEquals(v : Vector2D) : Vector2D {
		x -= v.x;
		y -= v.y;
		return this;
	}

	public function minusEquals2(x : Float, y : Float) : Vector2D {
		this.x -= x;
		this.y -= y;
		return this;
	}

	public function mult(s : Float) : Vector2D {
		return new Vector2D(x * s, y * s);
	}

	public function multEquals(s : Float) : Vector2D {
		x *= s;
		y *= s;
		return this;
	}

	public function times(v : Vector2D) : Vector2D {
		return new Vector2D(x * v.x, y * v.y);
	}

	public function times2(x : Float, y : Float) : Vector2D {
		return new Vector2D(this.x * x, this.y * y);
	}

	public function timesEquals(v : Vector2D) : Vector2D {
		x *= v.x;
		y *= v.y;
		return this;
	}

	public function timesEquals2(x : Float, y : Float) : Vector2D {
		this.x *= x;
		this.y *= y;
		return this;
	}

	public function div(s : Float) : Vector2D {
		if (s == 0) s = 0.0001;
		return new Vector2D(x / s, y / s);
	}

	public function divEquals(s : Float) : Vector2D {
		if (s == 0) s = 0.0001;
		x /= s;
		y /= s;
		return this;
	}
	
	public function length() : Float {
		return Math.sqrt(x * x + y * y);
	}

	public function lengthSqr() : Float {
		return x * x + y * y;
	}	
	
	public function unit() : Vector2D {
		var t = Math.sqrt(x * x + y * y) + Maths.ZERO_TOLERANCE;
		return new Vector2D(x / t, y / t);
	}	
	
	public function unitEquals() : Vector2D {
		var t = Math.sqrt(x * x + y * y) + Maths.ZERO_TOLERANCE;
		x /= t;
		y /= t;
		return this;
	}
	
	public function leftHandNormal() : Vector2D {
		return new Vector2D(this.y, -this.x);
	}	
	
	public function leftHandNormalEquals() : Vector2D {
		var t = x;
		x = y;
		y = -t;
		return this;
	}

	public function rightHandNormal() : Vector2D {
		return new Vector2D(-this.y, this.x);
	}
		
	public function rightHandNormalEquals() : Vector2D {
		var t = x;
		x = -y;
		y = x;
		return this;
	}

	public function distance(v : Vector2D) : Float {
		var delta : Vector2D = v.minus(this);// this.minus(v);
		return delta.length();
	}

	public function distanceSqrd(v:Vector2D):Float {
		var dX = this.x - v.x;
		var dY = this.y - v.y;
		return dX * dX + dY * dY;
	}
	
	public function clampMax(max : Float) : Vector2D {
		var l : Float = length();
		if (l > max) {
			multEquals(max / l);
		}
		return this;
	}
	
	public function interpolate(v:Vector2D, t:Float):Vector2D {
		return mult(1 - t).plus(v.mult(t));
		//return cpvadd(cpvmult(v1, 1.0f - t), cpvmult(v2, t));
	}
	
	public function rotate(angle : Float) : Vector2D {
		var a : Float = angle * Math.PI / 180;
		var cos : Float = Math.cos(a);
		var sin : Float = Math.sin(a);
		return new Vector2D((cos * x) - (sin * y), (cos * y) + (sin * x));
	}
	
	public function rotateEquals(angle : Float) : Vector2D {
		var a : Float = angle * Math.PI / 180;
		var cos : Float = Math.cos(a);
		var sin : Float = Math.sin(a);
		var rx : Float = (cos * x) - (sin * y);
		var ry : Float = (cos * y) + (sin * x);
		this.x = rx;
		this.y = ry;
		return this;
	}
	
	public function isEquals(v:Vector2D) : Bool {
		return (this.x==v.x)&&(this.y==v.y);
	}

	public function equalsZero() : Bool {
		return this.x == 0 && this.y == 0;
	}
	
	public function clone() : Vector2D {
		return new Vector2D(x, y);
	}
	
	public function toString() : String {
		return (x + ":" + y);
	}
	
	public static function fromString( str : String ) : Vector2D {
		if (str == null) return null;
		
		var vectorParts = str.split(":");
		if ((vectorParts == null) || (vectorParts.length != 2)) return null;
		var xVal : Float = Std.parseFloat(vectorParts[0]);
		var yVal : Float = Std.parseFloat(vectorParts[1]);
		if ( (Math.isNaN(xVal)) || (Math.isNaN(yVal)) ) return null;
		return new Vector2D(xVal, yVal);
	}
	
}