package physics.dynamics;
import haxe.ds.IntMap;
import physics.PhysicsEngine;

/**
 * ...
 * @author rje
 */

class BodyContactManager 
{
	public var engine:PhysicsEngine;
	public var contacts:IntMap<BodyContact>;
	
	public function new(engine:PhysicsEngine) 
	{
		this.engine = engine;
		contacts = new IntMap<BodyContact>();
	}
	
	public function UpdateContacts(body1:Body, body2:Body):Bool {
		
		if (body1.collisionProcessingMask == 0 && body2.collisionProcessingMask == 0) return false;
		
		var bodyHash:Int = Body.HashBodyIDs(body1.id, body2.id);
		
		var bodyContact : BodyContact = contacts.get(bodyHash);
		
		if (bodyContact!=null) {
			if (bodyContact.stamp < engine.update) {
				bodyContact.contactCount = 0;
				bodyContact.stamp = engine.update;
			}
			bodyContact.contactCount++;
		} else {
			bodyContact = new BodyContact();
			bodyContact.hash = bodyHash;
			bodyContact.stamp = engine.update;
			bodyContact.contactCount = 1;
			bodyContact.startContact = true;
			bodyContact.endContact = false;
			bodyContact.bodyA = body1;
			bodyContact.bodyB = body2;
			contacts.set(bodyHash, bodyContact);
		}
		return true;
	}
	
	public function ProcessBodyContacts() : Void {
		var contactIter = contacts.iterator();
		var count = 0;
		for (bodyContact in contactIter) {
			count++;
			if (bodyContact.stamp < engine.update)
				bodyContact.endContact = true;

			if (bodyContact.bodyA.collisionProcessingMask>0) {
				if (( bodyContact.bodyA.collisionProcessingMask & 1 > 0 ) && (bodyContact.startContact)) bodyContact.bodyA.OnStartCollision(bodyContact);
				if ( bodyContact.bodyA.collisionProcessingMask & 2 > 0 ) bodyContact.bodyA.OnCollision(bodyContact);
				if (( bodyContact.bodyA.collisionProcessingMask & 4 > 0 ) && (bodyContact.endContact)) bodyContact.bodyA.OnEndCollision(bodyContact);
			}
			if (bodyContact.bodyB.collisionProcessingMask>0) {
				if (( bodyContact.bodyB.collisionProcessingMask & 1 > 0 ) && (bodyContact.startContact)) bodyContact.bodyB.OnStartCollision(bodyContact);
				if ( bodyContact.bodyB.collisionProcessingMask & 2 > 0 ) bodyContact.bodyB.OnCollision(bodyContact);
				if (( bodyContact.bodyB.collisionProcessingMask & 4 > 0 ) && (bodyContact.endContact)) bodyContact.bodyB.OnEndCollision(bodyContact);
			}

			bodyContact.startContact = false;

			if (bodyContact.endContact) {
				contacts.remove(bodyContact.hash);
			}
		}
		trace("Count=" + count);
	}
	
}