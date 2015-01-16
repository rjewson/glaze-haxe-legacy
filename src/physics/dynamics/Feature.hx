package physics.dynamics;
import physics.geometry.GeometricShape;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class Feature 
{
	
	public var body : Body;
	public var shape : GeometricShape;
	public var material : Material;
	
	public var position : Vector2D;
	
	public var isSensor : Bool;
	public var isCollidable : Bool;
	
	public var categoryBits:Int = 0x0001;
	public var maskBits:Int = 0xFFFF;
	public var groupIndex:Int = 0;

	public var contactCallback :  Arbiter -> Void;
	
	public function new( body:Body, shape:GeometricShape, material:Material ) 
	{
		this.body = body;
		this.shape = shape;
		this.material = material;
		this.isSensor = false;
		this.isCollidable = true;
		this.position = body.position;
	}
	
	public inline function copy(feature:Feature):Void {
		this.body = feature.body;
		this.shape = feature.shape;
		this.material = feature.material;
		this.position = feature.position;
	}
	
}