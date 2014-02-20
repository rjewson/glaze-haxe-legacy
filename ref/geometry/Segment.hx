package physics.geometry;

/**
 * ...
 * @author rje
 */

class Segment extends GeometricShape
{
	public var a:Vector2D;
	public var b:Vector2D;
	public var n:Vector2D;
	public var delta:Vector2D;
	
	public var radius:Float;
	
	public var tA:Vector2D;
	public var tB:Vector2D;
	public var tN:Vector2D;
	public var tNneg:Vector2D;
	public var tNdottA:Float;
					
	public function new(a:Vector2D , b:Vector2D, radius:Float) 
	{
		super(Shapes.SEGMENT_SHAPE, null);
		this.a = a.clone();
		this.b = b.clone();
		this.radius = radius;
		InitShape();
	}

	function InitShape():Void {
		delta = b.minus(a);
		this.n = delta.unit().rightHandNormal();
		
		this.tA = new Vector2D();
		this.tB = new Vector2D();
		this.tN = new Vector2D();
		this.tNneg = new Vector2D();
	}	

	public override function Update(rotation : Vector2D) : Void {
		tA.x = (a.x * rotation.x - a.y * rotation.y);
		tA.y = (a.x * rotation.y + a.y * rotation.x);
		tB.x = (b.x * rotation.x - b.y * rotation.y);
		tB.y = (b.x * rotation.y + b.y * rotation.x);
		tN.x = n.x * rotation.x - n.y * rotation.y;
		tN.y = n.y * rotation.y + n.y * rotation.x;
		tNneg.x = -tN.x;
		tNneg.y = -tN.y;
		tNdottA = tN.x * tA.x + tN.y * tA.y;
		
		if(tA.x < tB.x){
				aabb.l = tA.x - radius;
				aabb.r = tB.x + radius;
		} else {
				aabb.l = tB.x - radius;
				aabb.r = tA.x + radius;
		}
		
		if(tA.y < tB.y){
				aabb.t = tA.y - radius;
				aabb.b = tB.y + radius;
		} else {
				aabb.t = tB.y - radius;
				aabb.b = tA.y + radius;
		}
	}	
	
}