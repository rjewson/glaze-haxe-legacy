package physics;
import haxe.ds.GenericStack;
import haxe.Timer;
import physics.collision.broadphase.action.IBroadphaseAction;
import physics.collision.narrowphase.INarrowphase;
import physics.collision.narrowphase.sat.SAT;
import physics.dynamics.Body;
import physics.dynamics.BodyContactManager;
import physics.geometry.AABB;
import physics.geometry.Circle;
import physics.geometry.GeometricShape;
import physics.geometry.Polygon;
import physics.geometry.Ray;
import physics.geometry.Shapes;
import physics.geometry.Vector2D;

class PhysicsEngine 
{
	public var fps : Int;
	public var pps : Int;
	public var physicsDeltaTime : Float;
	
	public var currTime : Float;
	public var deltaTime : Float;
	
	public var msPerFrame : Int;
	public var msPerPhysics : Int;
	private var accumulator : Float;
	
	public var step : Int;
	public var update : Int;
	
	public var forces : Vector2D;
	public var masslessForces : Vector2D;
	
	public var damping:Float;

	public var dynamicBodies:GenericStack<Body>;
	public var staticBodies:GenericStack<Body>;

	public var narrowphase : INarrowphase;
	
	public var contactManager : BodyContactManager;
		
	public function new(fps : Int, pps : Int, narrowphase:INarrowphase) 
	{
		this.fps = fps;
		this.pps = pps;
		this.narrowphase = narrowphase;

		Initalize();
	}
	
	function Initalize():Void {

		//contactManager = new BodyContactManager(this);
		
		this.narrowphase.bodyContactManager = contactManager;
		
		accumulator = 0.0;
		currTime = 0.0;
		msPerFrame = cast 1000 / fps;
		msPerPhysics = cast 1000 / pps;
		physicsDeltaTime = 1 / pps;
		step = 0;
		
		forces = new Vector2D();
		masslessForces = new Vector2D();

		damping = 0.995;

		dynamicBodies = new GenericStack<Body>();
		staticBodies = new GenericStack<Body>();

	}

	public function Step() : Void {
		step++;
		var newTime : Float = Date.now().getTime();
		deltaTime = newTime - currTime;
		currTime = newTime;

		// Run onStep updates for all bodies
		ProcessOnStep(step);
		
		if (deltaTime > 100) deltaTime = 100;
		// Run the physics
		accumulator += deltaTime;
		
		while (accumulator >= msPerPhysics) {
			accumulator -= msPerPhysics;
			update++;
			Update();
			Collide();
		}

		// Process Body contacts
		if (contactManager!=null)
			contactManager.ProcessBodyContacts();

	}
	
	public function Update():Void {
		
	}
	
	public function Collide():Void {
		
	}
	
	public function StartStaticUpdate(body:Body):Void {
		
	}
	
	public function EndStaticUpdate(body:Body):Void {
		
	}
		
	public function AddBody(body : Body) : Void {
		body.OnAddedToEngine(this);
	}

	public function RemoveBody(body : Body) : Void {
	}
	
	public function SleepItem(body:Body):Bool {
		return true;
	}
	
	public function WakeItem(body:Body):Bool {
		return true;
	}
	
	public function CastRay(ray : Ray)  : Vector2D {
		return null;
	}
	
	public function ProcessAction(action : IBroadphaseAction) : Void {
		
	}
	
	public function ProcessShapes(position:Vector2D, range:Float, action:GeometricShape -> Vector2D -> Void ) {

	}
		
}