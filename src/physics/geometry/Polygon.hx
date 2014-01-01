package physics.geometry;
import physics.dynamics.Feature;

/**
 * ...
 * @author rje
 */

class Polygon extends GeometricShape
{

	public var vertices : Array<Vector2D>;
	public var transformedVertices : Array<Vector2D>;
	
	public var axes : Array<Axis>;
	public var transformedAxes : Array<Axis>;
	
	public var vertexCount : Int;
	
	public function new(vertices:Array<Vector2D>, offsetX:Float=0,offsetY:Float=0) 
	{
		super(Shapes.POLYGON_SHAPE,offsetX,offsetY);
		InitShape(vertices);
	}
	
	function InitShape(originalVertices:Array<Vector2D>):Void {
		var v0 : Vector2D; 
		var v1 : Vector2D;
		var v2 : Vector2D;
		var a : Vector2D;
		var b : Vector2D;
		var n : Vector2D;
		var axis : Axis;

		vertices = new Array<Vector2D>();
		transformedVertices = new Array<Vector2D>();
		axes = new Array<Axis>();
		transformedAxes = new Array<Axis>();
		
		vertexCount = originalVertices.length;

		area = 0;
		
		for (i in 0...vertexCount) {
			v0 = originalVertices[i];
			v1 = originalVertices[(i + 1) % vertexCount];
			v2 = originalVertices[(i + 2) % vertexCount];

			a = new Vector2D(v0.x+offset.x,v0.y+offset.y);
			b = new Vector2D(v1.x+offset.x,v1.y+offset.y);
			n = b.minus(a).rightHandNormal().unit();

			vertices.push(a);
			transformedVertices.push(a.clone());
			
			axis = new Axis(n, n.dot(a));
			axes.push(axis);
			transformedAxes.push(axis.clone());
			
			area += v1.x * (v2.y - v0.y);
		}
		area /= -2;
		
		originalVertices = null;
	}
	
	public override function Update( rotation : Vector2D) : Void {
		var v : Vector2D;
		var tv : Vector2D;

		aabb.l = aabb.t = 4294967296;
		aabb.r = aabb.b = -4294967296;

		for (i in 0...vertexCount) {
			v = vertices[i];
			tv = transformedVertices[i];
			tv.x = (v.x * rotation.x - v.y * rotation.y);
			tv.y = (v.x * rotation.y + v.y * rotation.x);
			if (tv.x < aabb.l) aabb.l = tv.x;
			if (tv.x > aabb.r) aabb.r = tv.x;
			if (tv.y < aabb.t) aabb.t = tv.y;
			if (tv.y > aabb.b) aabb.b = tv.y;
		}

		var a : Axis;
		var ta : Axis;
		
		for (i in 0...vertexCount) {
			a = axes[i];
			ta = transformedAxes[i];
			ta.n.x = a.n.x * rotation.x - a.n.y * rotation.y;
			ta.n.y = a.n.x * rotation.y + a.n.y * rotation.x;
			ta.d = a.d;//(p.x * ta.n.x + p.y * ta.n.y) + a.d;
		}
	}
	
	public override function ContainsPoint(point : Vector2D, shapePosition:Vector2D) : Bool {
		for (a in transformedAxes) {
			if (((a.n.x * point.x + a.n.y * point.y) - ((shapePosition.x * a.n.x + shapePosition.y * a.n.y) + a.d) ) > 0 )
				return false;
		}
		return true;
	}

	public override function IntersectRay(ray : Ray, feature:Feature) : Bool {
		var tfar : Float = ray.range;
		var tnear : Float = 0;
		var nnear : Axis = null;
		var nfar : Axis = null;

		var ta : Axis;
		var tv : Vector2D;

		for (i in 0...vertexCount) {
			ta = transformedAxes[i];
			tv = transformedVertices[i];
			// var D:Vector2D = tv.minus(ray.origin);
			var Dx : Float = (tv.x + feature.position.x) - ray.origin.x;
			var Dy : Float = (tv.y + feature.position.y) - ray.origin.y;
			var denom : Float = Dx * ta.n.x + Dy * ta.n.y;
			// D.dot(ta.n);
			var numer : Float = ray.direction.x * ta.n.x + ray.direction.y * ta.n.y;
			// ray.direction.dot(ta.n);

			if ((numer < 0 ? -numer : numer) < 0.000000001) {
				if (denom < 0)
					return false;
			} else {
				var tclip : Float = denom / numer;
				if (numer < 0) {
					if (tclip > tfar)
						return false;
					if (tclip > tnear) {
						tnear = tclip;
						nnear = ta;
					}
				} else {
					if (tclip < tnear)
						return false;
					if (tclip < tfar) {
						tfar = tclip;
						nfar = ta;
					}
				}
			}
		}
		if (nnear==null) return false;
		// var t:Float = -(ray.origin.dot(nnear.n) - nnear.d) / (ray.direction.dot(nnear.n));
		
		
//			var t : Float = -((ray.origin.x * nnear.n.x + ray.origin.y * nnear.n.y) - nnear.d) / (ray.direction.x * nnear.n.x + ray.direction.y * nnear.n.y);
		var t : Float = -((ray.origin.x * nnear.n.x + ray.origin.y * nnear.n.y) - ( (feature.position.x * nnear.n.x + feature.position.y * nnear.n.y) +  nnear.d)) / (ray.direction.x * nnear.n.x + ray.direction.y * nnear.n.y);
		
		
		// return ray.origin.plus(ray.direction.mult(t));
		// return new Vector2D(ray.origin.x + (ray.direction.x * t), ray.origin.y + (ray.direction.y * t));
		return ray.ReportResult(feature, t, nnear.n);
	}

	public override function IntersectSegment(a:Vector2D, b:Vector2D, feature:Feature) {
		//cpSplittingPlane *axes = poly->tPlanes;
		//cpVect *verts = poly->tVerts;
		//int numVerts = poly->numVerts;

		var ta : Axis;
		//var tv : Vector2D;

		for (i in 0...vertexCount) {
			ta = transformedAxes[i];
			//tv = transformedVertices[i];
			var an = a.dot(ta.n);
			var ad = (feature.position.x * ta.n.x + feature.position.y * ta.n.y) +  ta.d;
			if ( ad > an )
				continue;
			
			var bn = b.dot(ta.n);
			
			var t = (ad - an)/(bn - an);
			if (t < 0.0 || 1.0 < t) 
				continue;
				
			var point = a.interpolate(b, t);
			var dt = -ta.n.cross(point);
			var dtMin = -ta.n.cross(transformedVertices[i]);
			var dtMax = -ta.n.cross(transformedVertices[(i + 1) % vertexCount]);
			if(dtMin <= dt && dt <= dtMax){
				//info->shape = (cpShape *)poly;
				//info->t = t;
				//info->n = n;
			}
		}
	}
	
	inline public function ValueOnAxis(a:Axis, axisPosition:Vector2D, shapePosition:Vector2D ) : Float {
		var min : Float = 4294967296;
		var result;
		for (vertex in transformedVertices) {
			result = (a.n.x * (vertex.x + shapePosition.x)  + a.n.y * (vertex.y + shapePosition.y)) - ( (axisPosition.x * a.n.x + axisPosition.y * a.n.y) + a.d);//a.d;
			if (result < min) min = result;
		}
		return min;
	}
	
	public static function CreateRectangle(w : Float, h : Float) : Array<Vector2D> {
		var rect : Array<Vector2D> = new Array<Vector2D>();
		rect.push(new Vector2D(-w / 2, -h / 2));
		rect.push(new Vector2D(-w / 2, h / 2));
		rect.push(new Vector2D(w / 2, h / 2));
		rect.push(new Vector2D(w / 2, -h / 2));
		return rect;
	}

	
}