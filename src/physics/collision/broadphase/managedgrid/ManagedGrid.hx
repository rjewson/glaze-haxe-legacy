
package physics.collision.broadphase.managedgrid;

import ds.Grid2D;
import physics.collision.broadphase.managedgrid.Cell;
import physics.collision.narrowphase.INarrowphase;
import physics.dynamics.Body;
import physics.PhysicsEngine;

class ManagedGrid extends PhysicsEngine
{

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
                grid.data.push(new Cell(index++,x*grid.cellSize,y*grid.cellSize,grid.cellSize,grid.cellSize));
            }
        }
    }

    override public function Update() {
        for (cell in grid.data) {        
            for (body in cell.dynamicItems) {
                body.Update();
                if (!cell.aabb.containtsPoint(body.position)) {
                    cell.RemoveBody(body);
                    AddBodyToCell(body);
                }
            }
        }
    }

   override public function Collide() {
        for (cell in grid.data) {        
            for (i in 0...cell.dynamicItems.length) {
                var bodyA = cell.dynamicItems[i];
                for (j in i+1...cell.dynamicItems.length) {
                    var bodyB = cell.dynamicItems[j];
                    trace("a+b");
                    narrowphase.CollideBodies(bodyA,bodyB);
                }
            }
        }
    }

    override public function AddBody(body : Body) : Void {
        super.AddBody(body);
        AddBodyToCell(body);
    }

    public function AddBodyToCell(body:Body) {
        var x = grid.Index(body.position.x);
        var y = grid.Index(body.position.y);
        var cell = grid.GetGridSafe(x,y);
        if (cell!=null)
            cell.AddBody(body);
    }

}