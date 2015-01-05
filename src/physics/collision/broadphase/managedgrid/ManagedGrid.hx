
package physics.collision.broadphase.managedgrid;

import ds.AABBTree;
import ds.Grid2D;
import physics.collision.broadphase.managedgrid.Cell;
import physics.collision.narrowphase.INarrowphase;
import physics.dynamics.Body;
import physics.geometry.Vector2D;
import physics.PhysicsEngine;
import physics.collision.broadphase.action.ActionResultCollection;

class ManagedGrid extends PhysicsEngine
{

    public var grid:Grid2D<Cell>;
    public var worldExtents:physics.geometry.AABB;

    // public var tree:AABBTree<Body>;

    public function new(fps : Int, pps : Int, narrowphase:INarrowphase, worldGridWidth:Int, worldGridHeight:Int, cellSize:Int) 
    {
        super(fps, pps, narrowphase);
        
        grid = new Grid2D<Cell>(worldGridWidth, worldGridHeight, cellSize);

        // tree = new ds.AABBTree<Body>(10, new ds.aabbtree.InsertStrategyArea());

        init();
    }


    function init():Void {    
        var index = 0;
        for (y in 0...grid.gridWidth) {
            for (x in 0...grid.gridHeight) {
                grid.data.push(new Cell(index++,x*grid.cellSize,y*grid.cellSize,grid.cellSize,grid.cellSize));
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

    override public function Update() {
        for (cell in grid.data) {        
            for (body in cell.dynamicItems) {
                body.Update(step);
                if (!cell.aabb.containtsPoint(body.position)) {
                    cell.RemoveBody(body);
                    AddBodyToCell(body);
                }
            }
        }
        // var ids = tree.getLeavesIds();
        // for (id in ids) {
        //     var e = tree.getData(id);
        //     tree.updateLeaf(id, e.position.x,e.position.y,e.aabb.width(),e.aabb.height() );
        // }
    }

   override public function Collide() {
        for (cell in grid.data) {        
            for (i in 0...cell.dynamicItems.length) {
                var bodyA = cell.dynamicItems[i];
                for (j in i+1...cell.dynamicItems.length) {
                    var bodyB = cell.dynamicItems[j];
                    narrowphase.CollideBodies(bodyA,bodyB);
                }
            }
        }
    }

    override public function AddBody(body : Body) : Void {
        super.AddBody(body);
        AddBodyToCell(body);
        // tree.insertLeaf(body,body.position.x,body.position.y,body.aabb.width(),body.aabb.height());
    }

    public function AddBodyToCell(body:Body) {
        var x = grid.Index(body.position.x);
        var y = grid.Index(body.position.y);
        var cell = grid.GetGridSafe(x,y);
        if (cell!=null)
            cell.AddBody(body);
    }

    override public function RemoveBody(body : Body) : Void {
        var cell = grid.data[body.broadphaseData1];       
        var index = cell.dynamicItems.indexOf(body);
        if (index>=0) {
            cell.dynamicItems.splice(index,1);
            return;
        }
    }

    override public function Search(position:Vector2D,radius:Float):ActionResultCollection {
                
        actionResultCollection.Reset();
        
        for (cell in grid.data) {        
            cell.SearchCell(position,radius,actionResultCollection);
        }

        return actionResultCollection;

    }

}