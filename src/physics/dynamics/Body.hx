package physics.dynamics;

import physics.constraints.Constraint;
import physics.geometry.AABB;
import physics.geometry.GeometricShape;
import physics.geometry.Vector2D;
import physics.geometry.VertexList;
import physics.PhysicsEngine;
import ds.IDManager;

/**
 * ...
 * @author rje
 */

class Body
{

	private static var nextBodyID : Int = 0;
		
	public var id : Int;
	public var transient : Bool;
	
	public var next:Body;
	public var prev:Body;

	public var position:Vector2D;
	public var prevPosition : Vector2D; 
	public var tempPosition : Vector2D; 
	
	private var accumulatedForces : Vector2D;
	
	public var angle:Float;
	public var rotation:Vector2D;
	
	public var mass : Float;
	public var invMass : Float;
	
	public var motion : Float;
	
	public var features : Array<Feature>;
	public var constraints : Array<Constraint>;
	
	public var aabb:AABB;
	public var radius : Float;
	public var radiusSqrd : Float;
	
	private var averageCenterOffset : Vector2D;
	public var averageCenter : Vector2D;
	
	public var maxAcceleration : Float;
	public var maxVelocityScalar : Float;
	public var maxVelocityScalarSqrd : Float;	

	public var damping : Float;
	public var masslessForcesFactor:Float;
		
	public var group : Int;
	public var layers : Int;
	public var collisionProcessingMask : Int;
	public var bodyTypeMask : Int;
	
	public var canKeepAlive:Bool;
	public var allowedToSleep:Bool;
	public var canSleep:Bool;
	public var isSleeping:Bool;
	
	public var isStatic:Bool;
	public var isKinematic:Bool;
	public var isOpaque:Bool;
	
	public var engine:PhysicsEngine;
	
	public var broadphaseData1:Int;
	public var broadphaseData2:Int;
	
	public var userData1:Dynamic;
	public var userData2:Dynamic;

	public var relativePoints:VertexList;
	
	public var createdMS:Float;
	public var lastStep:Int;
	
	public function new() 
	{
		id = transient ? IDManager.GetTransientID() : IDManager.GetPersistentID();
		//transient = false;
		//id = nextBodyID++;
		this.aabb = new AABB();
		averageCenterOffset = new Vector2D();
		averageCenter = new Vector2D();
		
		position = new Vector2D();
		prevPosition = new Vector2D();
		tempPosition = new Vector2D();
		accumulatedForces = new Vector2D();
		rotation = new Vector2D();
		features = new Array<Feature>();
		constraints = new Array<Constraint>();
		SetAngle(0);
		SetMass(1);
		SetMaximumScalarVelocity(20);
		maxAcceleration = 50;
		motion = Constants.WAKE_MOTION;
		
		damping = 1;
		masslessForcesFactor = 1;
		
		radius = radiusSqrd = 0;
		
		group = 0;
		layers = 0xFFFF;
		
		canKeepAlive = true;
		allowedToSleep = true;
		canSleep = true;
		isSleeping = false;
		isStatic = false;
		isKinematic = false;
		isOpaque = false;
		
		collisionProcessingMask = 0;

		lastStep = -1;
		
		Initalize();
	}
	
	public function Initalize():Void {
		
	}
	
	public function Update(step:Int):Void {
		if (isStatic || isSleeping)
			return;
		if (step==lastStep)
			return;
		lastStep = step;
		// AddMasslessForce(masslessForces);
		accumulatedForces.x += engine.masslessForces.x*masslessForcesFactor;
		accumulatedForces.y += engine.masslessForces.y*masslessForcesFactor;

		// AddForce(forces);
		accumulatedForces.x += engine.forces.x * invMass;
		accumulatedForces.y += engine.forces.y * invMass;

		// tempPosition.copy(position);
		tempPosition.x = position.x;
		tempPosition.y = position.y;

		// var nv : Vector2D = velocity.plus(accumulatedForces.multEquals(deltaTime));
		var nvX : Float = (position.x - prevPosition.x) + (accumulatedForces.x * engine.physicsDeltaTime);
		var nvY : Float = (position.y - prevPosition.y) + (accumulatedForces.y * engine.physicsDeltaTime);

		// nv.multEquals(damping);
		nvX *= (damping * engine.damping);
		nvY *= (damping * engine.damping);

		if (maxVelocityScalarSqrd > 0) {
			var scalarVelocitySqr = nvX * nvX + nvY * nvY;
			if (scalarVelocitySqr > maxVelocityScalarSqrd) {
				var factor = maxVelocityScalar / Math.sqrt(scalarVelocitySqr);
				nvX *= factor;
				nvY *= factor;
			}
		}

		// .clampMax(maxSpeed);//0.0625

		// position.plusEquals(nv);
		position.x += nvX;
		position.y += nvY;

		// prevPosition.copy(tempPosition);
		prevPosition.x = tempPosition.x;
		prevPosition.y = tempPosition.y;

		accumulatedForces.x = accumulatedForces.y = 0;
		damping = 1;

		motion = (Constants.SLEEP_BIAS * motion) + ((1 - Constants.SLEEP_BIAS) * (nvX * nvX + nvY * nvY));

		if (motion > (10 * Constants.SLEEP_EPSILON)) motion = 10 * Constants.SLEEP_EPSILON;

		canSleep = false;
		if (motion < Constants.SLEEP_EPSILON) 
			canSleep = true;

		for (constraint in constraints) {
			if (!constraint.resolve()) {
				constraint.Destroy();
			}
		}
			
		averageCenter.x = position.x + averageCenterOffset.x;
		averageCenter.y = position.y + averageCenterOffset.y;		
	}
	
	public function OnStep(step:Int):Bool {
		return true;
	}
	
	public function OnPause():Bool {
		return true;
	}
	
	public function Sleep():Bool {
		if (isSleeping||!allowedToSleep)
			return false;
			
		if (engine.SleepItem(this)) {
			motion = 0;
			return true;
		}
		
		return false;
	}
	
	public function Wake():Bool {
		if (!isSleeping)
			return false;
			
		if (engine.WakeItem(this)) {
			motion = Constants.WAKE_MOTION;
			return true;
		}
		
		return false;
	}
	
	inline public function GetVelocity() : Vector2D {
		return position.minus(prevPosition);
	}

	inline public function SetVelocity(value : Vector2D) : Void {
		prevPosition.x = position.x - value.x;
		prevPosition.y = position.y - value.y;
		if (isSleeping) Wake();
	}
	
	public function AddForce(force:Vector2D):Void {
		accumulatedForces.plusEquals(force.mult(invMass));
		if (isSleeping) Wake();
	}
	
	public function AddMasslessForce(force : Vector2D) : Void {
		accumulatedForces.plusEquals(force);
		if (isSleeping) Wake();
	}	
	
	public function RespondToCollision(collision : Arbiter, mtd : Vector2D, newVelocity : Vector2D, normal : Vector2D, depth : Float, o : Int) : Void {
		if (isStatic) return;
		position.x += mtd.x*1.001;
		position.y += mtd.y*1.001;
		SetVelocity(newVelocity);
		if (isSleeping)
			Wake();
	}
	
	public function SetAngle(angle : Float) : Void {
		this.angle = angle % 6.28318530717; //2*PI
		rotation.x = Math.cos(this.angle);
		rotation.y = Math.sin(this.angle);
		UpdateFeatures();
	}
	
	public function SetMass(mass : Float) : Void {
		this.mass = mass;
		this.invMass = 1 / mass;
	}
	
	public function MakeStatic() : Void {
		isStatic = true;
		isOpaque = true;
		SetMass(Math.POSITIVE_INFINITY);
	}
	
	public function SetMaximumScalarVelocity(maxVelocity : Float) : Void {
		maxVelocityScalar = maxVelocity;
		maxVelocityScalarSqrd = maxVelocityScalar * maxVelocityScalar;
	}

	public function SetStaticPosition(position : Vector2D) : Void {
		this.position.copy(position);
		prevPosition.copy(position);
		averageCenter.x = position.x + averageCenterOffset.x;
		averageCenter.y = position.y + averageCenterOffset.y;
		if (isSleeping) Wake();
	}

	public function Skew(delta : Vector2D) : Void {
		position.plusEquals(delta);
		prevPosition.plusEquals(delta);
		if (isSleeping) Wake();
	}

	public function SetRadius(r : Float) : Void {
		radius = r;
		radiusSqrd = r * r;
	}

	public function AddFeature(shape:GeometricShape,material:Material):Feature  {
		var feature = new Feature(this, shape, material);
		features.push(feature);
		feature.shape.Update(rotation);
		aabb.expand(feature.shape.aabb);
		
		aabb.setToCenter(averageCenterOffset);
		
		var rX : Float = averageCenterOffset.x - aabb.r;
		var rY : Float = averageCenterOffset.y - aabb.t;
		radiusSqrd = rX * rX + rY * rY;
		radius = Math.sqrt(radiusSqrd);
				
		return feature;
	}
	
	public function UpdateFeatures() : Void {
		aabb.reset();
		for (feature in features) {
			feature.shape.Update(rotation);
			aabb.expand(feature.shape.aabb);
		}
		aabb.setToCenter(averageCenterOffset);
		
		var rX : Float = averageCenterOffset.x - aabb.r;
		var rY : Float = averageCenterOffset.y - aabb.t;
		radiusSqrd = rX * rX + rY * rY;
		radius = Math.sqrt(radiusSqrd);
		
		if (relativePoints != null)
			relativePoints.Update(rotation, false);
	}

	public function AddConstraint(constraint:Constraint):Void {
		constraints.push(constraint);
	}

	public function RemoveConstraint(constraint:Constraint):Void {
		constraints.remove(constraint);
	}
	
	public function OnAddedToEngine(engine:PhysicsEngine):Void {
		this.engine = engine;
		createdMS = engine.currTime;
	}
	
	public function OnStartCollision(contact:BodyContact):Void {
		trace("Start " + contact.hash);
	}	
	
	public function OnCollision(contact:BodyContact):Void {
		trace("hit");
	}	
	
	public function OnEndCollision(contact:BodyContact):Void {
		
	}
	
	public function Destroy():Void {
		engine.RemoveBody(this);
		
		for (constraint in constraints)
			constraint.Destroy();
		
		if (transient)
			IDManager.ReleaseTransientID(id);
	}
		
	inline public static function HashBodyIDs(body1ID:Int, body2ID:Int):Int {
		return (body1ID < body2ID) ? (body1ID << 16) | body2ID : (body2ID << 16) | body1ID;
	}
	
}