package worldEngine.tiles;
import worldEngine.WorldData;
import worldEngine.tiles.Tile;
			
/**
 * ...
 * @author rje
 */

class TileFactory 
{
	public var tiles : Array<Tile>;
	public var tilesDict : Map<Int,Tile>;

	public var tileTypes:Map<String,Array<Int>>;

	public function new() {
		tiles = new Array<Tile>();
		tilesDict = new Map<Int,Tile>();
		tileTypes = new Map<String,Array<Int>>();
		Initalize();
	}

	public function Initalize():Void {
		
		var idInc : Int = 0;

		// New Format
		/*
		type 6 Rotate
		6				                             110
		2684354566		10100000000000000000000000000110
		3221225478		11000000000000000000000000000110
		1610612742		 1100000000000000000000000000110

		Flip
		Rotate
		2147483654		10000000000000000000000000000110
		3758096390		11100000000000000000000000000110
		1073741830		 1000000000000000000000000000110
		536870918		  100000000000000000000000000110
		 * 
		 */

		tileTypes = [
			"empty"  => [0,0,0,0,0,0,0,0,0],
			"full"   => [1,0,1,0,1,0,1,0,0],
			"half45" => [1,0,1,0,1,0,0,0,0],
			"half"   => [1,0,1,1,0,0,0,1,0],
			"half22" => [1,0,1,1,0,0,0,0,0],
			"half66" => [0,1,1,0,1,0,0,0,0],
			"full22" => [1,0,1,0,1,0,0,1,0],
			"full66" => [1,0,1,0,1,1,0,0,0]
		];

		for (tileType in tileTypes) {
			var modifierCount = idInc < 2 ? 1 : 4;
			for (modifier in 0...modifierCount) {
				tiles.push( new Tile( 32,tileType,idInc++,modifier ) );
			}
		}
		// trace(tiles);
	}

}