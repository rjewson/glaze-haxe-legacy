package physics.collision.narrowphase.sat;
import physics.collision.narrowphase.INarrowphase;
import physics.Constants;
import physics.dynamics.Arbiter;
import physics.dynamics.Body;
import physics.dynamics.BodyContact;
import physics.dynamics.BodyContactManager;
import physics.dynamics.Feature;
import physics.geometry.AABB;
import physics.geometry.AABBShape;
import physics.geometry.Axis;
import physics.geometry.Circle;
import physics.geometry.GeometricShape;
import physics.geometry.Polygon;
import physics.geometry.Segment;
import physics.geometry.Shapes;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class SAT implements INarrowphase
{
	
	public var result : Arbiter; 

	public var bodyContactManager:BodyContactManager;
	
	public function new() 
	{
		result = new Arbiter();
	}
	
	inline public function CollideBodies(body1:Body, body2:Body, n:Vector2D = null):Void {
		if (body1.features.length == 1 && body2.features.length == 1) {
			//bypass AABB comparison
			CollideFeatures(body1.features[0], body2.features[0], n);
		} else {
			for (feature1 in body1.features) {
				for (feature2 in body2.features) {
					if (AABB.intersects(feature1.shape.aabb, feature1.body.position, feature2.shape.aabb, feature2.body.position))
						CollideFeatures(feature1, feature2, n);
				}
			}
		}
	}
	
	public function CollideFeatures(feature1 : Feature, feature2 : Feature , n:Vector2D = null) : Bool {
		//js.Lib.debug();

		if (feature1.body == feature2.body) return false;
		// Shapes are on the same layer? exit...
		if (feature1.body.layers & feature2.body.layers == 0) return false;
		// Shapes are in the same group? exit...
		if ((feature1.body.group > 0 && feature2.body.group > 0 && feature1.body.group == feature2.body.group)) return false;

		//if ((feature1.group && feature2.group && feature1.group == feature2.group)) return false;

		// if (!(feature1.shape.aabb.intersects(feature2.shape.aabb))) return false;

		var s1 : GeometricShape = feature1.shape;
		var s2 : GeometricShape = feature2.shape;

		// var result : Arbiter = new Arbiter();
		result.contactCount = 0;
		if (s1.typeID > s2.typeID) {
			var tempShape2 : GeometricShape = s1;
			s1 = s2;
			s2 = tempShape2;
			result.feature1 = feature2;
			result.feature2 = feature1;
		} else {
			result.feature1 = feature1;
			result.feature2 = feature2;
		}
		var collided : Bool = false;
		// Choose and call the correct collision function based on the two shapes.
		
		//if (s1.typeID == Shapes.AXIS_ALIGNED_BOX_SHAPE)
		// I can also assume that the broadphase already did this...
		// collided = s1.aabb.intersects(s2.aabb);
		//	collided = true;
		//else {
			
			switch (s1.typeID | s2.typeID) {
				case (Shapes.AABB_AABB) :
					collided = SAT.aabb2aabb(cast s1, result.feature1.position, cast s2, result.feature2.position, result);
				case (Shapes.POLYGON_POLYGON) :
					collided = SAT.poly2poly(cast s1, result.feature1.position, cast s2, result.feature2.position, result);
				case (Shapes.CIRCLE_POLYGON) :
					collided = SAT.circle2poly(cast s1, result.feature1.position, cast s2, result.feature2.position, result);
				case (Shapes.CIRCLE_CIRCLE) :
					collided = SAT.circle2circle(cast s1, result.feature1.position, cast s2, result.feature2.position, result);
				case (Shapes.CIRCLE_SEGMENT) :
					collided = SAT.circle2segment(cast s1, result.feature1.position, cast s2, result.feature2.position, result);
				/*case (Shapes.SEGMENT_POLYGON) :
					collided = SAT.segment2poly(Segment(s1), Polygon(s2), result);
					break;*/
			}
		//}
		// The narrow phase reported a collision.
		if (collided) {
			feature1.body.Wake();// broadphase.WakeBody(feature1.body);
			feature2.body.Wake();
			//FIXME
			//Collision normal override...yikes
			//if (n) result.contacts[0].n.copy(n);
			
			if (result.Resolve()) {
				if (bodyContactManager != null)
					bodyContactManager.UpdateContacts(feature1.body, feature2.body);
				return true;
			}
		}
		return false;
	}
	
	static public function aabb2aabb( shape1:AABBShape,shape1Pos:Vector2D,shape2:AABBShape,shape2Pos:Vector2D,arbiter:Arbiter ):Bool {
		// public static function AABBvsAABB(a_halfWidths:Vector2D,a_center:Vector2D,b_halfWidths:Vector2D,b_center:Vector2D,result:Contact):Bool {
		//      //TODO Check
		 // var combinedHalfWidths:Vector2D = a_halfWidths.plus(b_halfWidths);
		 // var combinedHalfWidths:Vector2D = shape1.halfWidths.plus(shape2.halfWidths);
		 // var delta:Vector2D = b_center.minus(a_center);
		 // var planeN : Vector2D = delta.majorAxis().reverse();
		 // var planeCentre : Vector2D = planeN.times(combinedHalfWidths).plusEquals(b_center);
		 // var planeDelta : Vector2D = a_center.minus(planeCentre);
		 // var dist : Float = planeDelta.dot(planeN);
		 // result.Initialise(planeN, dist, a_center);
		 // return dist<0;
		//  }		

		var tx:Float = (shape1.transformedCentre.x + shape1Pos.x) - (shape2.transformedCentre.x + shape2Pos.x);
		var x_overlap:Float = shape1.halfWidths.x + shape2.halfWidths.x - Math.abs(tx);
		var ty:Float = (shape1.transformedCentre.y + shape1Pos.y) - (shape2.transformedCentre.y + shape2Pos.y);
		var y_overlap:Float = shape1.halfWidths.y + shape2.halfWidths.y - Math.abs(ty);

		if (x_overlap > y_overlap) {
			arbiter.AddContact(0, 0, 1, 0, (tx<0)?1:-1, x_overlap );
		} else {
			arbiter.AddContact(0, 0, 0, 1, (ty<0)?1:-1, x_overlap );
		}
		return true;
	}

	static public function poly2poly( shape1:Polygon ,shape1Pos:Vector2D, shape2:Polygon ,shape2Pos:Vector2D , arbiter:Arbiter ):Bool {
			
		var vertValOnAxis:Float;
		var minValOnAxis:Float;

		var minPen1:Float = -Constants.FMAX;
		var minAxis1:Axis = null;
		
		//First, project shape 2 vertices onto shape 1 axes & find MSA
		//var a:Axis;
		//for (i in 0...shape1.vertexCount) {
		for (a in shape1.transformedAxes) {
			//a = shape1.transformedAxes[i];
			minValOnAxis = shape2.ValueOnAxis(a,shape1Pos,shape2Pos);
			//No penetration on this axis, early out
			if (minValOnAxis > 0) return false; 
			if (minValOnAxis > minPen1) {
				minPen1 = minValOnAxis;
				minAxis1 = a;
			}
		}

		var minPen2:Float = -Constants.FMAX;
		var minAxis2:Axis = null;

		//Second, project shape 1 vertices onto shape 2 axes & find MSA
		//for (i in 0...shape2.vertexCount) {
		for (a in shape2.transformedAxes) {
			//a = shape2.transformedAxes[i];
			minValOnAxis = shape1.ValueOnAxis(a,shape2Pos,shape1Pos);
			//No penetration on this axis, early out
			if (minValOnAxis > 0) return false;
			if (minValOnAxis > minPen2) {
				minPen2 = minValOnAxis;
				minAxis2 = a;
			}
		}
		
		var minAxis:Axis;
		var nCoef:Float;
		var dist:Float;
		
		if (minPen1 > minPen2) {
			minAxis = minAxis1;
			nCoef = 1;
			dist = minPen1;
		} else {
			minAxis = minAxis2;
			nCoef = -1;
			dist = minPen2;				
		}
		//FIXME Add correct points
		arbiter.AddContact(0, 0, minAxis.n.x, minAxis.n.y, nCoef, dist );
		
		return true;
	}
	
	static public function circle2circle( circle1:Circle , circle1Pos:Vector2D, circle2:Circle, circle2Pos:Vector2D , arbiter:Arbiter ):Bool {
		return circle2circleQuery(circle1.transformedCentre.x + circle1Pos.x, circle1.transformedCentre.y + circle1Pos.y, circle2.transformedCentre.x + circle2Pos.x, circle2.transformedCentre.y + circle2Pos.y, circle1.radius, circle2.radius, arbiter);
	}
	
	inline static function circle2circleQuery( p1x:Float, p1y:Float , p2x:Float, p2y:Float , r1:Float , r2:Float, arbiter:Arbiter ):Bool {
		var minDist = r1+r2;
		var x = p2x - p1x;
		var y = p2y - p1y;
		var distSqr = x * x + y * y;
		var result = false;
		if (distSqr < (minDist * minDist) ) {
			var dist = Math.sqrt(distSqr) + 0.0000001;
			var invDist = 1 / dist;
			var deltaFact = 0.5 + (r1 - 0.5 * minDist) / dist;			
			arbiter.AddContact( p1x + x * deltaFact , 
								p1y + y * deltaFact ,
								x * invDist,
								y * invDist,
								1,
								dist - minDist);
			result = true;
		}
		return result;
	}
	
	static public function circle2poly( circle:Circle , circlePos:Vector2D, poly:Polygon , polyPos:Vector2D, arbiter:Arbiter):Bool {
		
		var miniA:Axis = null;
		
		var min = -Constants.FMAX;

		var tCx = circle.transformedCentre.x+circlePos.x;
		var tCy = circle.transformedCentre.y+circlePos.y;
		
		var miniVindex:Int = 0;
		for (i in 0...poly.vertexCount) {
			var tA = poly.transformedAxes[i];
			var dist = (tA.n.x * tCx + tA.n.y * tCy) - ((polyPos.x * tA.n.x + polyPos.y * tA.n.y) + tA.d) - circle.radius;//tA.d - circle.r;
			if (dist > 0)
				return false;
			if (dist > min) {
				min = dist;
				miniA = tA;
				miniVindex = i;
			}
		}
		var miniV = poly.transformedVertices[miniVindex];
		
		var n = miniA.n;
		var ax = miniV.x + polyPos.x;
		var ay = miniV.y + polyPos.y;
		miniVindex++;
		
		var b = poly.transformedVertices[miniVindex % poly.vertexCount];
		var bx = b.x + polyPos.x;
		var by = b.y + polyPos.y;
		
		var dtb = n.x * by - n.y * bx;
		var dt  = n.x * tCy - n.y * tCx;
		
		if (dt < dtb) 
			return circle2circleQuery(tCx,tCy, bx, by, circle.radius, 0,arbiter);
		
		var dta = n.x * ay - n.y * ax;	
			
		if (dt < dta) {
			var factor = circle.radius + ( min / 2);
			arbiter.AddContact( tCx - (n.x * factor), tCy - (n.y * factor), n.x, n.y , -1, min) ;				
			return true;
		} 
			
		return circle2circleQuery(tCx, tCy, ax, ay, circle.radius, 0,arbiter);
	}

	static public function circle2segment( circle:Circle , circlePos:Vector2D, segment:Segment , segmentPos:Vector2D, arbiter:Arbiter):Bool {
		var tAP = segment.tA.plus(segmentPos);
		var tCP = circle.transformedCentre.plus(circlePos);
		
		var closest_t = segment.delta.dot(tCP.minus(tAP)) / segment.delta.lengthSqr();
		if (closest_t < 0)
			closest_t = 0;
		if (closest_t > 1)
			closest_t = 1;
		var closest = tAP.plus(segment.delta.mult(closest_t));
		
		return circle2circleQuery(tCP.x, tCP.y, closest.x, closest.y, circle.radius, segment.radius, arbiter);
	}
	
}