package ds.doublelinkedgrid;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class DoubleLinkedGridNode 
{

	public var x : Int;
	public var y : Int;
	
	public var up:DoubleLinkedGridNode;
	public var down:DoubleLinkedGridNode;
	public var left:DoubleLinkedGridNode;
	public var right : DoubleLinkedGridNode;

	public var item:IGridNodeItem;
	
	public function new(x:Int,y:Int) 
	{
		this.x = x;
		this.y = y;
		UpdatePosition(x,y);
	}

	public function UpdatePosition(x:Int,y:Int) : Void {
		if (x == this.x && y == this.y) 
			return;
		this.x = x;
		this.y = y;
		if (item!=null) 
			item.Update(x,y);
	}
	
}