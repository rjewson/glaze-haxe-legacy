package physics;
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
import physics.signals.ChannelSignalData;

/**
 * ...
 * @author rje
 */

class PhysicsEngine 
{
	public var fps : Float;
	public var pps : Float;
	public var physicsDeltaTime : Float;
	
	public var currTime : Float;
	public var deltaTime : Float;
	
	public var msPerFrame : Float;
	public var msPerPhysics : Float;
	private var accumulator : Float;
	
	public var step : Int;
	public var update : Int;
	
	public var forces : Vector2D;
	public var masslessForces : Vector2D;
	
	public var damping:Float;

	public var narrowphase : INarrowphase;
	
	public var contactManager : BodyContactManager;
		
	public function new(fps : Float, pps : Float, narrowphase:INarrowphase) 
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
		msPerFrame = 1000 / fps;
		msPerPhysics = 1000 / pps;
		physicsDeltaTime = 1 / pps;
		step = 0;
		
		forces = new Vector2D();
		masslessForces = new Vector2D();

		damping = 0.995;

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
	
	public function ProcessOnStep(step:Int):Void {
		
	}
	
	public function RenderItems(timeStamp:Int, aabb:AABB):Void {
		
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