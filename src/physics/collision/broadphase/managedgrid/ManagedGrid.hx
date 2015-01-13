
package physics.collision.broadphase.managedgrid;

import ds.AABBTree;
import ds.Grid2D;
import physics.collision.broadphase.managedgrid.Cell;
import physics.collision.narrowphase.INarrowphase;
import physics.dynamics.Body;
import physics.geometry.Vector2D;
import physics.PhysicsEngine;

class ManagedGrid extends PhysicsEngine
{

    public static inline var LEFT:Int = 1;
    public static inline var LEFTUP:Int = 2;
    public static inline var UP:Int = 4;
    public static inline var UPRIGHT:Int = 8;
    public static inline var RIGHT:Int = 16;
    public static inline var RIGHTDOWN:Int = 32;
    public static inline var DOWN:Int = 64;
    public static inline var DOWNLEFT:Int = 128;

    public var grid:Grid2D<Cell>;
    public var worldExtents:physics.geometry.AABB;

    public function new(fps : Int, pps : Int, narrowphase:INarrowphase, worldGridWidth:Int, worldGridHeight:Int, cellSize:Int) 
    {
        super(fps, pps, narrowphase);
        
        grid = new Grid2D<Cell>(worldGridWidth, worldGridHeight, cellSize);

        init();
    }


    function init():Void {    
        var index = 0;
        for (y in 0...grid.gridWidth) {
            for (x in 0...grid.gridHeight) {
                grid.data.push(new Cell(this,index++,x*grid.cellSize,y*grid.cellSize,grid.cellSize,grid.cellSize));
            }
        }
        for (x in 0...grid.gridWidth) {
            for (y in 0...grid.gridHeight) {
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

    override public function Update() {
        for (cell in grid.data) {        
            for (body in cell.dynamicItems) {
                body.Update(step);
                UpdateBodyInCells(body);
            }
        }
        Log();
    }

   override public function Collide() {
        for (cell in grid.data) {
            cell.Collide();
        }
    }

    override public function AddBody(body : Body) : Void {
        super.AddBody(body);
        body.broadphaseData1 = -1;
        body.broadphaseData2 = 0;
        UpdateBodyInCells(body);       
    }

    override public function RemoveBody(body : Body) : Void {
        var cell = grid.data[body.broadphaseData1];  
        cell.RemoveBody(body);
    }

    public function UpdateBodyInCells(body:Body) {
        
        var x = grid.Index(body.position.x);
        var y = grid.Index(body.position.y);

        var newOccupancy = 0;
        var newCell = grid.GetGridSafe(x,y);

        if ((body.position.x + body.aabb.l) < newCell.aabb.l) 
            newOccupancy |= LEFT;
        else if ((body.position.x + body.aabb.r) > newCell.aabb.r) 
            newOccupancy |= RIGHT;
            
        if ((body.position.y + body.aabb.t) < newCell.aabb.t) 
            newOccupancy |= UP;
        else if ((body.position.y + body.aabb.b) > newCell.aabb.b) 
            newOccupancy |= DOWN;
            
        if (newOccupancy > 0) {
            if ( newOccupancy & LEFT > 0 && newOccupancy & UP > 0 ) 
                newOccupancy |= LEFTUP;
                
            if ( newOccupancy & RIGHT > 0 && newOccupancy & UP > 0 ) 
                newOccupancy |= UPRIGHT;
                
            if ( newOccupancy & LEFT > 0 && newOccupancy & DOWN > 0 ) 
                newOccupancy |= DOWNLEFT;
                
            if ( newOccupancy & RIGHT > 0 && newOccupancy & DOWN > 0 ) 
                newOccupancy |= RIGHTDOWN;
        }

        var oldCell = grid.data[body.broadphaseData1];
        var oldOccupancy = body.broadphaseData2;

        //Same cell and occupancy?
        if (newCell==oldCell && newOccupancy==oldOccupancy)
            //Do nothing
            return;
        var cell:Cell;
        var offset:Int;
        //Remove it
        if (oldCell!=null) {
            oldCell.RemoveBody(body);
            for (i in 0...8) {
                offset = 1 << i;
                if ((oldOccupancy & offset) > 0) {
                    oldCell.adjacentCells[i].RemoveBody(body);
                }
            }             
        }
      
        //Re-add it
        newCell.AddBody(body);
        for (i in 0...8) {
            offset = 1 << i;
            if ((newOccupancy & offset) > 0) {
                cell = newCell.adjacentCells[i];
                if (cell != null)
                    cell.AddBody(body);
            }
        }

        body.broadphaseData1 = newCell.index;
        body.broadphaseData2 = newOccupancy;

    }

    override public function Search(position:Vector2D,radius:Float,result:Body->Float->Void):Void {
        for (cell in grid.data) {        
            cell.SearchCell(position,radius,result);
        }
    }

    public function Log() {
        trace("Frame:"+step);        
        for (y in 0...grid.gridHeight) {
            var line = "";
            for (x in 0...grid.gridWidth) {
                var cell = grid.GetGridSafe(x, y);
                line+=cell.dynamicItemLength+":"+cell.staticItemLength;
                line+=" | ";
            }
            trace(line);
        }        
    }

}