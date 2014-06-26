
package engine.physics;

import ash.core.NodeList;
import engine.nodes.PhysicsNode;

interface IBroadphase 
{

    function add(shape:geom.AABB):Void;
    function remove(shape:geom.AABB):Void;
    function collide(nodes:NodeList<PhysicsNode>,time:Float):Void;

}