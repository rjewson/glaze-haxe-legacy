package worldEngine.tiles;

/**
 * ...
 * @author rje
 */

class TileFeature 
{

	inline public static var COLLIDABLE:Int = 	1 << 0;
	inline public static var DRAWABLE:Int =		1 << 1;
	
	inline public static var STYLE_OFFSET:Int = 16;
	inline public static var RANDOMDATA_OFFSET:Int = 24;
	
	public var tile:Tile;
	public var edgeData:Int;
	public var data:Int;
	
	public function new(tile:Tile) {
		this.tile = tile;
		this.data = DRAWABLE;
		SetFlagBool(COLLIDABLE, tile.vertices.length > 0);
	}
	
	inline public function HasFlagBool(flag:Int):Bool {
		return (data & flag > 0);
	}
	
	inline public function SetFlagBool(flag:Int,state:Bool):Void {
		if (state) {
			data |= flag;
		} else {
			data &= ~flag;
		}
	}
	
	inline public function SetRandomData(random:Int):Void {
		data |= random << RANDOMDATA_OFFSET;
	}
	
	inline public function GetRandomData():Int {
		return (data >> RANDOMDATA_OFFSET) & 0xFF;
	}

	inline public function SetStyleData(style:Int):Void {
		data |= style << STYLE_OFFSET;
	}

	inline public function GetStyleData():Int {
		return (data >> STYLE_OFFSET) & 0xFF;
	}	

	public function SetEdgeData(left:TileFeature, up:TileFeature, right:TileFeature, down:TileFeature ):Void {
		if (!HasFlagBool(COLLIDABLE))
			return;
			
		if (left!=null&&left.HasFlagBool(COLLIDABLE)) {
			if ((tile.edges&Tile.SEG_1>0)&&(left.tile.edges&Tile.SEG_6>0)) edgeData |= Tile.SEG_1;
			if ((tile.edges&Tile.SEG_2>0)&&(left.tile.edges&Tile.SEG_5>0)) edgeData |= Tile.SEG_2;
		}
		if (right!=null&&right.HasFlagBool(COLLIDABLE)) {
			if ((tile.edges&Tile.SEG_6>0)&&(right.tile.edges&Tile.SEG_1>0)) edgeData |= Tile.SEG_6;
			if ((tile.edges&Tile.SEG_5>0)&&(right.tile.edges&Tile.SEG_2>0)) edgeData |= Tile.SEG_5;
		}
		if (up!=null&&up.HasFlagBool(COLLIDABLE)) {
			if ((tile.edges&Tile.SEG_8>0)&&(up.tile.edges&Tile.SEG_3>0)) edgeData |= Tile.SEG_8;
			if ((tile.edges&Tile.SEG_7>0)&&(up.tile.edges&Tile.SEG_4>0)) edgeData |= Tile.SEG_7;
		}
		if (down!=null&&down.HasFlagBool(COLLIDABLE)) {
			if ((tile.edges&Tile.SEG_3>0)&&(down.tile.edges&Tile.SEG_8>0)) edgeData |= Tile.SEG_3;
			if ((tile.edges&Tile.SEG_4>0)&&(down.tile.edges&Tile.SEG_7>0)) edgeData |= Tile.SEG_4;
		}			
		
	}
	
}