package physics.collision.broadphase.action;
import physics.dynamics.Body;

/**
 * ...
 * @author rje
 */

interface IBroadphaseAction 
{

	function Execute(result : ActionResultCollection) : Void;
	var params(default, default):ActionParams;
	
}