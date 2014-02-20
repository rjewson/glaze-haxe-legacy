package physics.dynamics;
import physics.geometry.Vector2D;
import utils.Maths;

/**
 * ...
 * @author rje
 */

class Arbiter 
{

	public var contacts : Array<Contact>;
	public var contactCount : Int;
	public var feature1 : Feature;
	public var feature2 : Feature;
	public var isSensor : Bool;
	
	private var mtdA : Vector2D; 
	private var mtdB : Vector2D; 
	private var vnA : Vector2D;
	private var vnB : Vector2D;
	
	public function new() 
	{
		contacts = new Array<Contact>();
		for (i in 0...2) { 
			contacts.push(new Contact());
		}
		contactCount = 0;
		
		mtdA = new Vector2D();
		mtdB = new Vector2D();
		vnA = new Vector2D();
		vnB = new Vector2D();
	}
	
	inline public function Reset():Void {
		contactCount = 0;
	}
	
	inline public function AddContact(pX : Float, pY : Float, nX : Float, nY : Float, nCoef : Float, dist : Float) : Void {
		var contact : Contact = contacts[contactCount];

		contact.point.x = pX;
		contact.point.y = pY;
		contact.normal.x = nX * nCoef;
		contact.normal.y = nY * nCoef;
		contact.penDist = dist;
	}
	
	inline public function OpposingBody(thiz:Body):Body {
		return thiz.id == feature1.body.id ? feature2.body : feature1.body;
	}
	
	inline public function Resolve():Bool {
		var bodyA:Body = feature1.body;
		var bodyB:Body = feature2.body;

		isSensor = feature1.isSensor || feature2.isSensor;
		
		if (!isSensor) {
			var normal:Vector2D = contacts[0].normal;
			//normal.setTo(0, 1);
			var depth:Float = contacts[0].penDist;
			
			var mtd:Vector2D = normal.mult(depth);
				//Inline
				//var mtdX:Float = normal.x * depth;
				//var mtdY:Float = normal.x * depth;
					   
			var te:Float = feature1.material.elasticity + feature2.material.elasticity;
			var sumInvMass:Float = feature1.body.invMass + feature2.body.invMass;

			// the total friction in a collision is combined but clamped to [0,1]
			var tf:Float = Maths.Clamp(1 - (feature1.material.friction + feature2.material.friction), 0, 1);
			
			// get the collision components, vn and vt
			//var ca:Collision = pa.getComponents(normal);
			
			//var ca_vel:Vector2D = bodyA.velocity;
				//Inline
				var ca_velX:Float = bodyA.position.x - bodyA.prevPosition.x;
				var ca_velY:Float = bodyA.position.y - bodyA.prevPosition.y;

			//var ca_vdotn:Float = normal.dot(ca_vel);
				//Inline x * v.x + y * v.y
				var ca_vdotn:Float = normal.x * ca_velX + normal.y * ca_velY;
			
			//var ca_vn:Vector2D  = normal.mult(ca_vdotn);
				//Inline
				var ca_vnX:Float  = normal.x * ca_vdotn;
				var ca_vnY:Float  = normal.y * ca_vdotn;
				
			//var ca_vt:Vector2D  = ca_vel.minus(ca_vn);
				//Inline	
				var ca_vtX:Float  = ca_velX - ca_vnX;
				var ca_vtY:Float  = ca_velY - ca_vnY;
			
			//var cb:Collision = pb.getComponents(normal);
			
			//var cb_vel:Vector2D = bodyB.velocity;
				//Inline
				var cb_velX:Float = bodyB.position.x - bodyB.prevPosition.x;
				var cb_velY:Float = bodyB.position.y - bodyB.prevPosition.y;
				
			//var cb_vdotn:Float = normal.dot(cb_vel);
				//Inline x * v.x + y * v.y
				var cb_vdotn:Float = normal.x * cb_velX + normal.y * cb_velY;
			
			//var cb_vn:Vector2D  = normal.mult(cb_vdotn);
				//Inline
				var cb_vnX:Float  = normal.x * cb_vdotn;
				var cb_vnY:Float  = normal.y * cb_vdotn;
								
			//var cb_vt:Vector2D  = cb_vel.minus(cb_vn);	
				//Inline
				var cb_vtX:Float  = cb_velX - cb_vnX;
				var cb_vtY:Float  = cb_velY - cb_vnY;
								
								
								
			 // calculate the coefficient of restitution as the normal component
			//var vnA:Vector2D = (cb_vn.mult((te + 1) * bodyA.invMass).plus(ca_vn.mult(bodyB.invMass - te * bodyA.invMass))).divEquals(sumInvMass);
				//Inline
				var vnAX:Float = ((cb_vnX * ((te + 1) * bodyA.invMass)) + (ca_vnX * (bodyB.invMass - te * bodyA.invMass)))/sumInvMass;
				var vnAY:Float = ((cb_vnY * ((te + 1) * bodyA.invMass)) + (ca_vnY * (bodyB.invMass - te * bodyA.invMass)))/sumInvMass;
			
			
			//var vnB:Vector2D = (ca_vn.mult((te + 1) * bodyB.invMass).plus(cb_vn.mult(bodyA.invMass - te * bodyB.invMass))).divEquals(sumInvMass);
				//Inline
				var vnBX:Float = ((ca_vnX * ((te + 1) * bodyB.invMass)) + (cb_vnX * (bodyA.invMass - te * bodyB.invMass)))/sumInvMass;
				var vnBY:Float = ((ca_vnY * ((te + 1) * bodyB.invMass)) + (cb_vnY * (bodyA.invMass - te * bodyB.invMass)))/sumInvMass;            
			
			
			// apply friction to the tangental component
			//ca_vt.multEquals(tf);
				//Inline
				ca_vtX *= tf;
				ca_vtY *= tf;
			//cb_vt.multEquals(tf);
				//Inline
				cb_vtX *= tf;
				cb_vtY *= tf;
			
			
			// scale the mtd by the ratio of the masses. heavier particles move less 
			//mtdA = mtd.mult( bodyA.invMass / sumInvMass); 
			var aMassRatio:Float = bodyA.invMass / sumInvMass;
			mtdA.x = mtd.x*aMassRatio;
			mtdA.y = mtd.y*aMassRatio;
			
			//mtdB = mtd.mult(-bodyB.invMass / sumInvMass);
			var bMassRatio:Float = -bodyB.invMass / sumInvMass;
			mtdB.x = mtd.x*bMassRatio;
			mtdB.y = mtd.y*bMassRatio;
						
			// add the tangental component to the normal component for the new velocity 
			//vnA.plusEquals(ca_vt);
			//vnB.plusEquals(cb_vt);

			//bodyA.RespondToCollision(this,mtdA, vnA, normal, depth, -1);
			//bodyB.RespondToCollision(this,mtdB, vnB, normal, depth,  1);
			
			
			//vnA = new Vector2D(vnAX+ca_vtX,vnAY+ca_vtY);    
			vnA.x = vnAX+ca_vtX;    
			vnA.y = vnAY+ca_vtY;
			 
			//vnB = new Vector2D(vnBX+cb_vtX,vnBY+cb_vtY);
			vnB.x = vnBX+cb_vtX;    
			vnB.y = vnBY+cb_vtY;
								   
			bodyA.RespondToCollision(this,mtdA, vnA, normal, depth, -1);
			bodyB.RespondToCollision(this,mtdB, vnB, normal, depth,  1);
			
		}
		
		if (feature1.contactCallback!=null) feature1.contactCallback(this);
		if (feature2.contactCallback != null) feature2.contactCallback(this);
		
		return !isSensor;
		
	}
	
}