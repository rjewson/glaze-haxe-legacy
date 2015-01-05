package physics.collision.broadphase.action;
import physics.dynamics.Body;

/**
 * ...
 * @author rje
 */

class ActionResultCollection
{

	public var results:Array<ActionResult>;
	public var resultCount:Int;
	
	public var opaqueBodies:Array<ActionResult>;
	public var opaqueBodyCount:Int;	
	
	var furthestDistSqrd:Float;
	
	public function new() 
	{
		results = new Array<ActionResult>();
		opaqueBodies = new Array<ActionResult>();
	}
	
	public function Reset():Void {

		for (i in 0...resultCount) {
			results[i].Reset();
		}
		resultCount = 0;
		
		for (i in 0...opaqueBodyCount) {
			opaqueBodies[i].Reset();
		}
		opaqueBodyCount = 0;
		
		furthestDistSqrd = 0;
	}
	
	public function AddResult(body:Body,distanceSqrd:Float):Void {
		
		var result:ActionResult;
		
		if (true) {
			resultCount++;
			
			if (resultCount > results.length) {
				result = new ActionResult();
				results.push(result);
			} else {
				result = results[resultCount-1];
			}
			
			result.body = body;
			result.distanceSqrd = distanceSqrd;
		}
		
		if (body.isOpaque) {
			opaqueBodyCount++;

			if (opaqueBodyCount > opaqueBodies.length) {
				result = new ActionResult();
				opaqueBodies.push(result);
			} else {
				result = opaqueBodies[opaqueBodyCount-1];
			}
			
			result.body = body;
			result.distanceSqrd = distanceSqrd;
		}
		
	}
	
	public function RemoveBody(body:Body) {
		var i = 0;
		while (i<results.length) {
			if (results[i].body==body) {
				results.splice(i,1);
				resultCount--;
				break;
			}
		}
	}

	public function Sort():Void {
		quicksort( results, 0, resultCount-1 );
		quicksort( opaqueBodies, 0, opaqueBodyCount-1 );
	}
	
/*	function quickSort( array:Array<ActionResult>, lo : Int, hi : Int ) : Void {
        var i = lo;
        var j = hi;
        //var buf = arr;
        var p = array[(lo+hi)>>1].distanceSqrd;
        while( i <= j ) {
            while( array[i].distanceSqrd > p ) i++;
            while( array[j].distanceSqrd < p ) j--;
            if( i <= j ) {
                var t = array[i];
                array[i++] = array[j];
                array[j--] = t;
            }
        }
        if( lo < j ) quicksort( array, lo, j );
        if( i < hi ) quicksort( array, i, hi );
    }*/

    function quicksort(arrayInput:Array<ActionResult>, left:Int, right:Int): Void {
		var i:Int = left;
		var j:Int = right;
		var pivotPoint:ActionResult = arrayInput[Math.round((left+right)*.5)];

		// Loop
		while (i<=j) {
			while (arrayInput[i].distanceSqrd < pivotPoint.distanceSqrd) {
				i++;
			}
			while (arrayInput[j].distanceSqrd > pivotPoint.distanceSqrd) {
				j--;
			}
			if (i <= j) {
				var tempStore:ActionResult = arrayInput[i];
				arrayInput[i] = arrayInput[j];
				i++;
				arrayInput[j] = tempStore;
				j--;
			}
		}
		// Swap
		if (left < j) {
			quicksort(arrayInput, left, j);
		}
		if (i < right) {
			quicksort(arrayInput, i, right);
		}

    }
	
}