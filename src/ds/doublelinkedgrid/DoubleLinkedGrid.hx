package ds.doublelinkedgrid;

/**
 * ...
 * @author rje
 */

class DoubleLinkedGrid 
{

	public var nodes:Array<DoubleLinkedGridNode>;
	
	public var focusNode : DoubleLinkedGridNode;
	
	public var width : Int;
	public var height : Int;
	
	var rowEdgeDistance : Int;
	var columnEdgeDistance : Int;
	var factory : IGridNodeFactory;

	public function new(width : Int, height : Int, factory : IGridNodeFactory) {
		this.width = width;
		this.height = height;
		this.factory = factory;
		Initalize();
	}

	public function Initalize() : Void {
		
		nodes = new Array<DoubleLinkedGridNode>();
		
		rowEdgeDistance = Math.floor(width/2);
		columnEdgeDistance = Math.floor(height/2);
		
		for (xPos in 0...width) {
		//for (var xPos : Int = 0; xPos < width; xPos++) {
			for (yPos in 0...height) {
			//for (var yPos : Int = 0; yPos < height; yPos++) {
				var node:DoubleLinkedGridNode = new DoubleLinkedGridNode(xPos,yPos);
				node.item = factory.CreateGridNodeItem();
				SetGridNode(xPos,yPos,node);
			}			
		}
		
		for (xPos in 0...width) {
		//for ( xPos = 0; xPos < width; xPos++) {
			for (yPos in 0...height) {
			//for ( yPos = 0; yPos < height; yPos++) {
				var node:DoubleLinkedGridNode = GetGridNode(xPos,yPos);
				node.up   = GetGridNode(xPos,   yPos-1);
				node.down = GetGridNode(xPos,   yPos+1);
				node.left = GetGridNode(xPos-1, yPos);
				node.right= GetGridNode(xPos+1, yPos);
			}			
		}		
			
		focusNode = GetGridNode(rowEdgeDistance,columnEdgeDistance);
		
	}

	public function SetFocus(x:Int,y:Int) : Void {
		x -= rowEdgeDistance;
		y -= columnEdgeDistance;
		for (xPos in 0...width) {
		//for (var xPos : Int = 0; xPos < width; xPos++) {
			for (yPos in 0...height) {
			//for (var yPos : Int = 0; yPos < height; yPos++) {
				GetGridNode(xPos,yPos).UpdatePosition(x+xPos, y+yPos);
			}			
		}
		focusNode = GetGridNode(rowEdgeDistance,columnEdgeDistance);
	}

	public function PanTo(x:Int,y:Int) : Void {
		if ( ( focusNode.x == x ) && (focusNode.y == y) ) {
			//trace("dont pan");
			return;
		}
		//trace("pan to:",x,y);
		//Dump();
		while ( focusNode.x < x ) {
			ShiftRight();
		}
		while ( focusNode.x > x ) {
			ShiftLeft();
		}
		while ( focusNode.y < y ) {
			ShiftDown();
		}
		while ( focusNode.y > y ) {
			ShiftUp();
		}
		//Dump();
	}


	public function GetGridNode(x:Int, y:Int):DoubleLinkedGridNode {
		if ( (x<-1)||(x>width+1)||(y<-1)||(y>height+1) )
			return null;
		if (x==-1)
			x=width-1;
		if (x==width)
			x=0;
		if (y==-1)
			y=height-1;
		if (y==height)
			y=0;

		return nodes[Std.int(y * width + x)];
	}
	
	public function SetGridNode(x:Int, y:Int, node:DoubleLinkedGridNode):Void {
		nodes[Std.int(y * width + x)] = node;
	}
	
	public function ShiftUp() : Void {
		//trace("Shift Up");
		var rowNode:DoubleLinkedGridNode = focusNode;
		for (i in 0...rowEdgeDistance) {
		//for (var i : Int = 0; i < rowEdgeDistance; i++) {
			rowNode = rowNode.down;
		}
		UpdateRow(rowNode,focusNode.y-rowEdgeDistance-1);
		focusNode = focusNode.up;
	}

	public function ShiftDown() : Void {
		//trace("Shift Down");
		var rowNode:DoubleLinkedGridNode = focusNode;
		for (i in 0...rowEdgeDistance) {
		//for (var i : Int = 0; i < rowEdgeDistance; i++) {
			rowNode = rowNode.up;
		}
		UpdateRow(rowNode,focusNode.y+rowEdgeDistance+1);
		focusNode = focusNode.down;
	}

	public function ShiftLeft() : Void {
		//trace("Shift Left");
		var columnNode:DoubleLinkedGridNode = focusNode;
		for (i in 0...columnEdgeDistance) {
		//for (var i : Int = 0; i < columnEdgeDistance; i++) {
			columnNode = columnNode.right;
		}
		UpdateColumn(columnNode,focusNode.x-columnEdgeDistance-1);
		focusNode = focusNode.left;
	}

	public function ShiftRight() : Void {
		//trace("Shift Right");
		var columnNode:DoubleLinkedGridNode = focusNode;
		for (i in 0...columnEdgeDistance) {
		//for (var i : Int = 0; i < columnEdgeDistance; i++) {
			columnNode = columnNode.left;
		}
		UpdateColumn(columnNode,focusNode.x+columnEdgeDistance+1);
		focusNode = focusNode.right;
	}
	
	public function UpdateRow(node:DoubleLinkedGridNode,newY:Int) : Void {
		var rowNode:DoubleLinkedGridNode = node;
		for (i in 0...width) {
		//for (var i : Int = 0; i < width; i++) {
			rowNode.UpdatePosition(rowNode.x, newY);
			rowNode = rowNode.right;
		}
	}

	public function UpdateColumn(node:DoubleLinkedGridNode,newX:Int) : Void {
		var columnNode:DoubleLinkedGridNode = node;
		for (i in 0...height) {
		//for (var i : Int = 0; i < height; i++) {
			columnNode.UpdatePosition(newX,columnNode.y);
			columnNode = columnNode.down;
		}			
	}
	
	//public function Dump():Void {
		//trace("FN="+focusNode.position);
		//for (var yPos : Int = 0; yPos < height; yPos++) {
			//var row:String = "";
			//for (var xPos : Int = 0; xPos < width; xPos++) {
				//var node:DoubleLinkedGridNode = GetGridNode(xPos, yPos);
				//var marker:String = (node==focusNode) ? ">" : " ";
				//row += marker+node.position.x+","+node.position.y;
			//}
			//trace(row);		
		//}
		//trace("-----------");
	//}
	
}