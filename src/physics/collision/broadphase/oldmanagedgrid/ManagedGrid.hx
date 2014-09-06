package physics.collision.broadphase.managedgrid;
import haxe.Int32;
import physics.collision.broadphase.action.ActionResultCollection;
import physics.collision.broadphase.action.IBroadphaseAction;
import physics.collision.narrowphase.INarrowphase;
import physics.dynamics.Body;
import physics.geometry.AABB;
import physics.geometry.Ray;
import physics.geometry.Vector2D;
import physics.PhysicsEngine;
import util.ds.Grid2D;

/**
 * ...
 * @author rje
 */

class ManagedGrid extends PhysicsEngine
{	
	public var grid:Grid2D<Cell>;
	
	public var worldExtents:AABB;
	
	var actionResultCollection:ActionResultCollection;
	
	var doubleCollisionList:Array<Int>;
	var doubleCollisionLength:Int;
	
	var staticUpdateHash:IntHash<Vector2D>;
	
	public function new(fps : Int, pps : Int, narrowphase:INarrowphase, worldGridWidth:Int, worldGridHeight:Int, cellSize:Int) 
	{
		super(fps, pps, narrowphase);
		
		grid = new Grid2D<Cell>(worldGridWidth, worldGridHeight, cellSize);
		
		worldExtents = new AABB(0, worldGridHeight * cellSize, worldGridWidth * cellSize, 0);
		
		actionResultCollection = new ActionResultCollection();
		
		doubleCollisionList = new Array<Int>();
		
		staticUpdateHash = new IntHash<Vector2D>();
		
		init();
	}
	
	function init():Void {
		
		var index = 0;
		for (y in 0...grid.gridWidth) {
			for (x in 0...grid.gridHeight) {
				grid.data.push(CellFactory(index++,x,y));
			}
		}

		for (y in 0...grid.gridWidth) {
			for (x in 0...grid.gridHeight) {
				var cell = grid.GetGridSafe(x, y);
				cell.adjacentCells.push(grid.GetGridSafe(x-1, y));
				cell.adjacentCells.push(grid.GetGridSafe(x-1, y-1));
				cell.adjacentCells.push(grid.GetGridSafe(x, y - 1));
				cell.adjacentCells.push(grid.GetGridSafe(x+1, y - 1));
				cell.adjacentCells.push(grid.GetGridSafe(x+1, y));
				cell.adjacentCells.push(grid.GetGridSafe(x+1, y+1));
				cell.adjacentCells.push(grid.GetGridSafe(x, y + 1));
				cell.adjacentCells.push(grid.GetGridSafe(x - 1, y + 1));
			}
		}
	}
	
	public function CellFactory(i:Int, x:Int, y:Int):Cell {
		return new Cell(this, i, x * grid.cellSize, y * grid.cellSize, grid.cellSize, grid.cellSize);
	}
	
	override public function Update():Void {
		for (cell in grid.data) {
			cell.Update();
		}
	}
	
	override public function Collide():Void {
		doubleCollisionLength = 0;
		for (cell in grid.data) {
			cell.Collide();
		}
	}
	
	override public function ProcessOnStep(step:Int):Void {
		for (cell in grid.data) {
			cell.OnStep(step);
		}
	}
	
	override public function AddBody(body:Body):Void {
		
		if (!body.isStatic) {
			AddDynamicBody(body);
		} else {
			var x1 = grid.Index(body.aabb.l+body.position.x);
			var y1 = grid.Index(body.aabb.t+body.position.y);
			var x2 = grid.Index(body.aabb.r+body.position.x)+1;
			var y2 = grid.Index(body.aabb.b+body.position.y)+1;
			for( x in x1...x2 ) {
				for ( y in y1...y2 ) {
					var cell = grid.GetGridSafe(x,y);
					cell.AddStaticItem(body);
				}
			}
		}

		super.AddBody(body);
	}
	
	public function AddDynamicBody(body:Body):Void {
		var cell = grid.GetGridSafe(grid.Index(body.position.x), grid.Index(body.position.y));
		if (cell!=null) {
			cell.AddItem(body);			
		}		
	}
	
	override public function RemoveBody(body:Body):Void {
		if (!body.isStatic) {
			RemoveDynamicBody(body);
		} else {
			var x1 = grid.Index(body.aabb.l+body.position.x);
			var y1 = grid.Index(body.aabb.t+body.position.y);
			var x2 = grid.Index(body.aabb.r+body.position.x)+1;
			var y2 = grid.Index(body.aabb.b+body.position.y)+1;
			for( x in x1...x2 ) {
				for ( y in y1...y2 ) {
					var cell = grid.GetGridSafe(x,y);
					cell.RemoveStaticItem(body);
				}
			}
		}
		super.RemoveBody(body);
	}
	
	public function RemoveDynamicBody(body:Body):Void {
		var cell = grid.data[body.broadphaseData];
		cell.ClearOccupancy(body);
		cell.RemoveItem(body);
	}
	
	override public function SleepItem(body:Body):Bool {
		return grid.data[body.broadphaseData].SleepItem(body);
	}
	
	override public function WakeItem(body:Body):Bool {
		return grid.data[body.broadphaseData].WakeItem(body);
	}

	override public function StartStaticUpdate(body:Body):Void {
		if (staticUpdateHash.exists(body.id))
			return;
		
		var indexPos:Vector2D = new Vector2D(grid.Index(body.position.x), grid.Index(body.position.y));
		staticUpdateHash.set(body.id, indexPos);

		for( x in Std.int(indexPos.x-1)...Std.int(indexPos.x+1) ) {
			for ( y in Std.int(indexPos.y-1)...Std.int(indexPos.y+1) ) {
				var cell = grid.GetGridSafe(x, y);
				if (cell!=null) {
					cell.forceWakeLockCount++;
					cell.WakeAll();
				}
			}
		}
	}
	
	override public function EndStaticUpdate(body:Body):Void {
		if (!staticUpdateHash.exists(body.id))
			return;
		var indexPos:Vector2D = staticUpdateHash.get(body.id);
		staticUpdateHash.remove(body.id);
		
		for( x in Std.int(indexPos.x-1)...Std.int(indexPos.x+1) ) {
			for ( y in Std.int(indexPos.y-1)...Std.int(indexPos.y+1) ) {
				var cell = grid.GetGridSafe(x, y);
				if (cell!=null) 
					cell.forceWakeLockCount--;
			}
		}			
	}
	
	public function CellPause(cell:Cell):Void {
		//trace("CellSleep");
	}	
	
	public function CellStart(cell:Cell):Void {
		//trace("CellWake");
	}
	
	override public function CastRay(ray : Ray) : Vector2D  {
		return null;
	}
	/*
	 * 
	 */
	override public function ProcessAction(action : IBroadphaseAction) : Void {
		
		//var coreX = grid.Index(action.params.position.x);
		//var coreY = grid.Index(action.params.position.y);
		//
		//SearchCell();
		
		actionResultCollection.Reset();
		action.params.PreProcess();
		
		var x1 = grid.Index(action.params.position.x - action.params.radius);
		var y1 = grid.Index(action.params.position.y - action.params.radius);
		var x2 = grid.Index(action.params.position.x + action.params.radius)+1;
		var y2 = grid.Index(action.params.position.y + action.params.radius)+1;
		for( x in x1...x2 ) {
			for ( y in y1...y2 ) {
				var cell = grid.GetGridSafe(x, y);
				if (cell!=null)
					cell.SearchCell(action, actionResultCollection);
			}
		}
		action.Execute(actionResultCollection);
	}
	
	inline public function CheckDoubleCollisions(body1:Body, body2:Body):Bool {
		if  (doubleCollisionLength == 0 || (body1.broadphaseData2 == 0 && body2.broadphaseData2 == 0)) {
			return false;
		} else {
			var hash = Body.HashBodyIDs(body1.id, body2.id);
			for (i in doubleCollisionList) {
				if (i == hash) { //Saves creating a ver variable
					hash = -1;
					break;
				}
			}
			return hash == -1;
		}
	}
	
	public function toString():String {
		var result:String = "";
		for (cell in grid.data) {
			if (cell.dynamicCount>0)
				result += "(" + cell.aabb.l/100 + ":" + cell.aabb.t/100 + "=" + cell.dynamicCount + ")";
		}
		return result;
	}
	
}