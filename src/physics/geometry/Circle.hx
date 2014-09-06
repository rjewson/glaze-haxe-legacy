package physics.geometry;
import physics.dynamics.Feature;

/**
 * ...
 * @author rje
 */

class Circle extends GeometricShape
{

	public var centre : Vector2D;
	public var transformedCentre : Vector2D;
	public var radius : Float;
	
	public function new(radius:Float, offset:Vector2D) 
	{
		super(Shapes.CIRCLE_SHAPE,offset);
		this.radius = radius;
		InitShape();
	}
	
	function InitShape():Void {
		centre = offset.clone();
		transformedCentre = centre.clone();
		area = Math.PI * (radius * radius);
	}
	
	public override function Update(rotation : Vector2D) : Void {
		transformedCentre.x = (centre.x * rotation.x - centre.y * rotation.y);
		//tC.x = p.x + (c.x * rot.x - c.y * rot.y);
		transformedCentre.y = (centre.x * rotation.y + centre.y * rotation.x);
		//tC.y = p.y + (c.x * rot.y + c.y * rot.x);
		aabb.l = transformedCentre.x - radius;
		aabb.r = transformedCentre.x + radius;
		aabb.t = transformedCentre.y - radius;
		aabb.b = transformedCentre.y + radius;
	}
	
	public override function ContainsPoint(point : Vector2D, shapePosition:Vector2D) : Bool {
		var x = transformedCentre.x + shapePosition.x - point.x;
		var y = transformedCentre.y + shapePosition.y - point.y;
		return (x * x + y * y) <= (radius * radius);
	}
	
	public override function IntersectRay(ray : Ray, feature:Feature) : Bool {
		// var dist : Vector2D = ray.origin.minus(tC);
		var distX : Float = ray.origin.x - (transformedCentre.x + feature.position.x);
		var distY : Float = ray.origin.y - (transformedCentre.y + feature.position.y);
		// var b : Number = dist.dot(ray.direction);
		var b : Float = distX * ray.direction.x + distY * ray.direction.y;
		if (b > 0) 
			return false;
		// Circle is behind the origin
		// var d : Number = (r * r) - (dist.dot(dist) - (b * b));
		var d : Float = (radius * radius) - (distX * distX + distY * distY - (b * b));
		if (d < 0) 
			return false;
		// Ray is not pointing towards the origin
		d = -b - Math.sqrt(d);
		return ray.ReportResult(feature, d, ray.returnNormal ? new Vector2D((ray.origin.x + (ray.direction.x * d)) - (transformedCentre.x + feature.position.x), (ray.origin.y + (ray.direction.y * d)) - (transformedCentre.y + feature.position.y)).unitEquals() : null);
		//return ray.ReportResult(feature, t, nnear.n);
	}
	
	public override function IntersectSegment(a:Vector2D, b:Vector2D, feature:Feature) {
		// offset the line to be relative to the circle
		//a = cpvsub(a, center);
		var tA = a.minus(transformedCentre).minus(feature.position);
		//b = cpvsub(b, center);
		var tB = b.minus(transformedCentre).minus(feature.position);
		
		//cpFloat qa = cpvdot(a, a) - 2.0f*cpvdot(a, b) + cpvdot(b, b);
		var qa = a.dot(a) - 2 * a.dot(b) + b.dot(b);
		
		//cpFloat qb = -2.0f*cpvdot(a, a) + 2.0f*cpvdot(a, b);
		var qb = -2 * a.dot(a) + 2 * a.dot(b);
		
		//cpFloat qc = cpvdot(a, a) - r*r;
		var qc = a.dot(a) - radius * radius;
		
		//cpFloat det = qb*qb - 4.0f*qa*qc;
		var det = qb * qb - 4 * qa * qc;
		
		if(det >= 0.0){
			//cpFloat t = (-qb - cpfsqrt(det))/(2.0f*qa);
			var t = ( -qb - Math.sqrt(det)) / (2 * qa);
			if(0.0<= t && t <= 1.0){
				//info->shape = shape;
				//info->t = t;
				//info->n = cpvnormalize(cpvlerp(a, b, t));
			}
		}		
	}
	
}