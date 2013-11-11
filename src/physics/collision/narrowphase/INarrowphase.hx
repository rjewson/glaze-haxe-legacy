package physics.collision.narrowphase;
import physics.dynamics.Body;
import physics.dynamics.BodyContact;
import physics.dynamics.BodyContactManager;
import physics.dynamics.Feature;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

interface INarrowphase 
{

	function CollideBodies(body1:Body, body2:Body, n:Vector2D = null):Void;
	
	function CollideFeatures(feature1 : Feature, feature2 : Feature , n:Vector2D = null ) : Bool;
	
	var bodyContactManager(default, default):BodyContactManager;
	
}