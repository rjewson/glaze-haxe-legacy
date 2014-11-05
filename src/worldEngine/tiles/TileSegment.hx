package worldEngine.tiles;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class TileSegment 
{

	public var v0 : Vector2D;
	public var v1 : Vector2D;
	public var mask : Int;

	public function new(v0 : Vector2D, v1 : Vector2D, mask : Int) {
		this.v0 = v0;
		this.v1 = v1;
		this.mask = mask;
	}

	public function CheckVertexPairAndApplyMask(c0 : Vector2D, c1 : Vector2D) : Int {
		if ( ( v0.isEquals(c0) && v1.isEquals(c1) ) || ( v0.isEquals(c1) && v1.isEquals(c0) ) ) {
			return mask;
		}
		return 0;
	}
	
}