package physics.collision.broadphase.managedgrid;
import haxe.ds.GenericStack;
import physics.collision.broadphase.action.ActionResultCollection;
import physics.collision.broadphase.action.IBroadphaseAction;
import physics.dynamics.Body;
import physics.geometry.AABB;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class Cell 
{

	public static inline var LEFT:Int = 1;
	public static inline var LEFTUP:Int = 2;
	public static inline var UP:Int = 4;
	public static inline var UPRIGHT:Int = 8;
	public static inline var RIGHT:Int = 16;
	public static inline var RIGHTDOWN:Int = 32;
	public static inline var DOWN:Int = 64;
	public static inline var DOWNLEFT:Int = 128;
	
	public var adjacentCells:Array<Cell>;
	
	public var processSleep:Bool;
	public var persistentActivity:Bool;
	public var transientActivity:Bool;
	
	public var adjacentPersistentActivity:Bool;
	public var adjacentTransientActivity:Bool;
	
	public var isPaused:Bool;
	
	public var aabb:AABB;
	public var width:Float;
	public var height:Float;

	public var dynamicItems:GenericStack<Body>;
	public var sleepingItems:GenericStack<Body>;
	public var staticItems:GenericStack<Body>;
	
	public var dynamicCount:Int;
	public var sleepingCount:Int;
	public var staticCount:Int;
	
	public var manager:ManagedGrid;
	public var index:Int;
	
	public var stamp:Int;
	
	public var forceWakeLockCount:Int;

	public function new(manager:ManagedGrid, index:Int, x:Float, y:Float, w:Float, h:Float) 
	{
		this.manager = manager;
		this.index = index;
		width = w;
		height = h;
		aabb = new AABB(x, y + h, x + w, y);
				
		dynamicItems = new GenericStack<Body>();
		sleepingItems = new GenericStack<Body>();
		staticItems = new GenericStack<Body>();
		
		adjacentCells = new Array<Cell>();
		
		stamp = -1;
		forceWakeLockCount = 0;
		isPaused = true;
	}
	
	public function AddItem(body:Body):Void {
		
		if (!body.isSleeping) {
			dynamicItems.add(body);
			dynamicCount++;
			Start();
		} else {
			sleepingItems.add(body);
			sleepingCount++;			
		}
		
		if (IsCoreCell(body)) {
			//body.coreCell = this;
			body.broadphaseData = index;
			body.broadphaseData2 = CalcCellItemOccupancy(body);
			SetOccupancy(body);
		}
		
	}
	
	public function AddStaticItem(body:Body):Void {
		staticItems.add(body);
		staticCount++;
	}
	
	public function RemoveItem(body:Body):Void {
		if (!body.isSleeping) {
			dynamicItems.remove(body);
			dynamicCount--;
		} else {
			sleepingItems.remove(body);
			sleepingCount--;
		}
	}
	
	public function RemoveStaticItem(body:Body):Void {
		staticItems.remove(body);
		staticCount--;
	}
	
	public function SetOccupancy(body:Body):Void {
		var cell:Cell;
		var offset:Int;
		for (i in 0...8) {
			offset = 1 << i;
			if ((body.broadphaseData2 & offset) > 0) {
				var cell:Cell = adjacentCells[i];
				if (cell != null)
					cell.AddItem(body);
			}
		}
	}
	
	public function ClearOccupancy(body:Body):Void {
		var cell:Cell;
		var offset:Int;
		for (i in 0...8) {
			offset = 1 << i;
			if ((body.broadphaseData2 & offset) > 0) {
				adjacentCells[i].RemoveItem(body);
			}
		}
	}
	
	inline public function IsCoreCell(body:Body):Bool {
		return ( body.position.x >= aabb.l && body.position.x < aabb.r && body.position.y >= aabb.t && body.position.y < aabb.b );
	}
	
	inline public function CalcCellItemOccupancy(body:Body):Int {
		var occupany:Int = 0;
		// js.Lib.debug();
		if ((body.position.x + body.aabb.l) < aabb.l) 
			occupany |= LEFT;
		else if ((body.position.x + body.aabb.r) > aabb.r) 
			occupany |= RIGHT;
			
		if ((body.position.y + body.aabb.t) < aabb.t) 
			occupany |= UP;
		else if ((body.position.y + body.aabb.b) > aabb.b) 
			occupany |= DOWN;
			
		if (occupany > 0) {
			if ( occupany & LEFT > 0 && occupany & UP > 0 ) 
				occupany |= LEFTUP;
				
			if ( occupany & RIGHT > 0 && occupany & UP > 0 ) 
				occupany |= UPRIGHT;
				
			if ( occupany & LEFT > 0 && occupany & DOWN > 0 ) 
				occupany |= DOWNLEFT;
				
			if ( occupany & RIGHT > 0 && occupany & DOWN > 0 ) 
				occupany |= RIGHTDOWN;
		}
			
		return occupany;
	}
	
	inline public function HashCellItem(body:Body):Void {
		//Only update coreCell if it is the coreCell
		if (body.broadphaseData == index) {
			//Check its still core
			if (IsCoreCell(body)) {
				var newOccupany:Int = CalcCellItemOccupancy(body);
				if (newOccupany != body.broadphaseData2) {
					ClearOccupancy(body);
					body.broadphaseData2 = newOccupany;
					SetOccupancy(body);
				}
			} else { //If not then remove
				manager.RemoveDynamicBody(body);
				manager.AddDynamicBody(body);
			}
		}		
	}

	inline public function SetProcessOnStepStatus():Void {
		
		adjacentPersistentActivity = false;
		adjacentTransientActivity = false;
		
		var cell:Cell;
		var offset:Int;
		for (i in 0...8) {
			cell = adjacentCells[i];
			if (cell!=null) {
				adjacentPersistentActivity = adjacentPersistentActivity || cell.persistentActivity;
				adjacentTransientActivity = adjacentTransientActivity || cell.transientActivity;
			}
		}
	}
	
	public function Update():Void {
		if (aabb.l == 0 && aabb.t == 0) {
			var stop = 1;
		}
		
		processSleep = false;
		persistentActivity = false;
		transientActivity = false;
		
		for (body in dynamicItems) {
			if (body.broadphaseData == index) {
				body.Update();
				HashCellItem(body);
				if (body.canSleep)
					body.Sleep();
			}
			
			if (body.canKeepAlive&&!body.isSleeping) {
				persistentActivity = true;
			} else {
				transientActivity = true;
			}
		}		
	}
	
	public function Collide():Void {
		var s1 = dynamicItems.head;
		while ( s1 != null ) {
			
			var item1 = s1.elt;
			var s2 = s1.next;
			while ( s2 != null ) {
				var item2 = s2.elt;
				
				manager.CheckDoubleCollisions(item1, item2);
				
				if (AABB.intersects(item1.aabb, item1.position, item2.aabb, item2.position))
					manager.narrowphase.CollideBodies(item1, item2);
				
				s2 = s2.next;
			}
			
			var s3 = staticItems.head;
			while (s3 != null) {
				var item3 = s3.elt;
				
				if (AABB.intersects(item1.aabb, item1.position, item3.aabb, item3.position))
					manager.narrowphase.CollideBodies(item1, item3);
				
				s3 = s3.next;
			}
			
			var s4 = sleepingItems.head;
			while (s4 != null) {
				var item4 = s4.elt;
				
				if (AABB.intersects(item1.aabb, item1.position, item4.aabb, item4.position))
					manager.narrowphase.CollideBodies(item1, item4);
				
				s4 = s4.next;
			}
			
			AdditionalCollide(item1);
			
			s1 = s1.next;
		}
	}
	
	public function AdditionalCollide(body:Body):Void {
		
	}
	/*
	 * 
	 *  
	 */
	
	public function OnStep(step:Int):Void {
	
		SetProcessOnStepStatus();
		
		if (transientActivity&&!persistentActivity&&!adjacentPersistentActivity) {
			Pause();
		}
		
		if (persistentActivity || adjacentPersistentActivity) {
			for (body in dynamicItems) {
				//Only Update cor bodies
				if (body.broadphaseData == index)
					body.OnStep(step);
			}	
			for (body in sleepingItems) {
				//Only Update cor bodies
				if (body.broadphaseData == index)
					body.OnStep(step);	
			}
			for (body in staticItems) {
				//FIXME Only update core bodies?
				body.OnStep(step);
			}
		} else if (forceWakeLockCount>0) {
			for (body in staticItems) {
				//FIXME Only update core bodies?
				body.OnStep(step);
			}
		}
		
	}
	
	public function Start():Void {
		if (!isPaused)
			return;
		isPaused = false;
		manager.CellStart(this);
	}
	
	public function Pause():Void {
		if (isPaused)
			return;
		isPaused = true;
		
		for (body in dynamicItems) {
			if (body.broadphaseData == index)
				if (!body.OnPause())
					manager.RemoveBody(body);
		}		
		
		for (body in sleepingItems) {
			if (body.broadphaseData == index)
				if (!body.OnPause())
					manager.RemoveBody(body);
		}
		
		manager.CellPause(this);
	}
	
	public function SleepItem(body:Body):Bool {
		trace("Sleep " + body);
		if (body.isSleeping || forceWakeLockCount>0)
			return false;
		ClearOccupancy(body);
		RemoveItem(body);
		body.isSleeping = true;
		AddItem(body);
		return true;
	}	
	
	public function WakeItem(body:Body):Bool {
		trace("Wake " + body);
		if (!body.isSleeping)
			return false;
		
		ClearOccupancy(body);
		RemoveItem(body);
		body.isSleeping = false;
		AddItem(body);
		return true;
	}
	
	public function WakeAll():Void {
		for (body in sleepingItems)
			body.Wake();
	}
	
	function SearchList(list:GenericStack<Body>, action: IBroadphaseAction, actionResultCollection:ActionResultCollection):Void {
		for (body in list) {
			if (body == action.params.queryBody)
				continue;
			//if ( !params.filter || body.bodyTypeMask & params.filter ) {
				var dX : Float = action.params.position.x - body.averageCenter.x;
				var dY : Float = action.params.position.y - body.averageCenter.y;
				var dSqrd : Float = dX * dX + dY * dY;
				if (dSqrd <= (action.params.radiusSqrd - body.radiusSqrd)) {
					//action.Execute(body);
					actionResultCollection.AddResult(body,dSqrd);
				}
			//}
		}
	}
	
	public function SearchCell(action: IBroadphaseAction, actionResultCollection:ActionResultCollection):Void {
		SearchList(dynamicItems, action, actionResultCollection);
		SearchList(sleepingItems, action, actionResultCollection);
		SearchList(staticItems, action, actionResultCollection);
	}
	
}