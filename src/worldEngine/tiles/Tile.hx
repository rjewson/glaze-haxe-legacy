package worldEngine.tiles;

import physics.geometry.Axis;
import physics.geometry.Polygon;
import physics.geometry.Vector2D;

/**
 * ...
 * @author rje
 */

class Tile extends Polygon
{
	inline public static var ZERO:Float 	= 0;
	inline public static var HALF:Float 	= 0.5;
	inline public static var ONE:Float 		= 1;
	
	public static var TOP_LEFT_0:Vector2D 		= new Vector2D(ZERO,ZERO);
	public static var MIDDLE_LEFT_1:Vector2D 	= new Vector2D(ZERO,HALF);
	public static var BOTTOM_LEFT_2:Vector2D 	= new Vector2D(ZERO,ONE);
	public static var BOTTOM_MIDDLE_3:Vector2D 	= new Vector2D(HALF,ONE);
	public static var BOTTOM_RIGHT_4:Vector2D 	= new Vector2D(ONE,ONE);
	public static var MIDDLE_RIGHT_5:Vector2D	= new Vector2D(ONE,HALF);
	public static var TOP_RIGHT_6:Vector2D 		= new Vector2D(ONE,ZERO);
	public static var TOP_MIDDLE_7:Vector2D 	= new Vector2D(HALF,ZERO);
	public static var MIDDLE_MIDDLE_8:Vector2D 	= new Vector2D(HALF,HALF);
	
	public static var VERTS:Array<Vector2D> = [
		TOP_LEFT_0,
		MIDDLE_LEFT_1,
		BOTTOM_LEFT_2,
		BOTTOM_MIDDLE_3,
		BOTTOM_RIGHT_4,
		MIDDLE_RIGHT_5,
		TOP_RIGHT_6,
		TOP_MIDDLE_7,
		MIDDLE_MIDDLE_8
	];
		
	inline public static var EDGE_STATE_OFF:Int				= 0;
	inline public static var EDGE_STATE_FULL:Int			= 1;
	inline public static var EDGE_STATE_INTERESTING:Int		= 4;
	
	inline public static var EDGE_TOP:Int		= 0;
	inline public static var EDGE_RIGHT:Int		= 1;
	inline public static var EDGE_BOTTOM:Int	= 2;
	inline public static var EDGE_LEFT:Int		= 3;
	
	public var tileID : Int;
	public var index : Int;
	public var originalVertMask:Array<Int>;
	public var unscaledVerts:Array<Vector2D>;
	public var scaledVerts:Array<Vector2D>;
	public var segments:Array<Vector2D>;
	
	public var edgeT:Int;
	public var edgeR:Int;
	public var edgeB:Int;
	public var edgeL:Int;
	
	public var tileWidth : Float;
	
	//Ouside edges
	//Left
	public static var  SEG_1:Int =  0x01;
	public static var  SEG_2:Int =  0x02;
	//Bottom
	public static var  SEG_3:Int =  0x04;
	public static var  SEG_4:Int =  0x08;
	//Right
	public static var  SEG_5:Int =  0x10;
	public static var  SEG_6:Int =  0x20;
	//Top
	public static var  SEG_7:Int =  0x40;
	public static var  SEG_8:Int =  0x80;
	
	
	//Inside vertical and horizontal
	//Top Middle |
	public static var  SEG_9:Int = 0x100;
	//Middle Left - 
	public static var SEG_10:Int = 0x200;
	//Middle Right - 
	public static var SEG_11:Int = 0x400;
	//Bottom Middle | 
	public static var SEG_12:Int = 0x800;
	
	//Inside slopes 45
	//Top Left 45 /
	public static var SEG_13:Int = 0x1000;
	//Bottom Left 45 / 
	public static var SEG_14:Int = 0x2000;
	//Top Right 45 / 
	public static var SEG_15:Int = 0x4000;
	//Bottom Right 45 / 
	public static var SEG_16:Int = 0x8000;
	
	//Top Left 45 
	public static var SEG_17:Int = 0x10000;
	//Bottom Left 45
	public static var SEG_18:Int = 0x20000;
	//Top Right 45
	public static var SEG_19:Int = 0x40000;
	//Bottom Right 45
	public static var SEG_20:Int = 0x80000;
	
	//Inside slopes 66
	//Left /
	public static var SEG_21:Int = 0x100000;
	//Right /
	public static var SEG_22:Int = 0x200000;
	//Left \
	public static var SEG_23:Int = 0x400000;
	//Right \ 
	public static var SEG_24:Int = 0x800000;
	
	//Inside slopes 22
	//Top /
	public static var SEG_25:Int = 0x1000000;
	//Bottom /
	public static var SEG_26:Int = 0x2000000;
	//Top \
	public static var SEG_27:Int = 0x4000000;
	//Bottom \
	public static var SEG_28:Int = 0x8000000;
	
	public static var SEG_UP:Int = 0;//0x10000000;
	
	public static var EDGE_SEGMENT_MASK:Int = 0xFF;
	
	public static var VERT_TO_SEG_DEF:Array<TileSegment> = [
	
		//Left
		new TileSegment(TOP_LEFT_0,MIDDLE_LEFT_1,SEG_1),
		new TileSegment(TOP_LEFT_0,BOTTOM_LEFT_2,SEG_1|SEG_2),
		new TileSegment(MIDDLE_LEFT_1,BOTTOM_LEFT_2,SEG_2),
	
		//Bottom
		new TileSegment(BOTTOM_LEFT_2,BOTTOM_MIDDLE_3,SEG_3),
		new TileSegment(BOTTOM_LEFT_2,BOTTOM_RIGHT_4,SEG_3|SEG_4),
		new TileSegment(BOTTOM_MIDDLE_3,BOTTOM_RIGHT_4,SEG_4),
		
		//Right
		new TileSegment(BOTTOM_RIGHT_4,MIDDLE_RIGHT_5,SEG_5),
		new TileSegment(BOTTOM_RIGHT_4,TOP_RIGHT_6,SEG_5|SEG_6),
		new TileSegment(MIDDLE_RIGHT_5,TOP_RIGHT_6,SEG_6),
		
		//Top
		new TileSegment(TOP_RIGHT_6,TOP_MIDDLE_7,SEG_7),
		new TileSegment(TOP_RIGHT_6,TOP_LEFT_0,SEG_7|SEG_8),
		new TileSegment(TOP_MIDDLE_7,TOP_LEFT_0,SEG_8),
		
		//Inside Vert
		new TileSegment(TOP_MIDDLE_7,MIDDLE_MIDDLE_8,SEG_9),
		new TileSegment(TOP_MIDDLE_7,BOTTOM_MIDDLE_3,SEG_9|SEG_12),
		new TileSegment(MIDDLE_MIDDLE_8,BOTTOM_MIDDLE_3,SEG_12),			

		//Inside Horiz
		new TileSegment(MIDDLE_LEFT_1,MIDDLE_MIDDLE_8,SEG_10),
		new TileSegment(MIDDLE_LEFT_1,MIDDLE_RIGHT_5,SEG_10|SEG_11),
		new TileSegment(MIDDLE_MIDDLE_8,MIDDLE_RIGHT_5,SEG_11),	
		
		
		//Inside slopes 45 /
		new TileSegment(MIDDLE_LEFT_1,TOP_MIDDLE_7,SEG_13),
		
		new TileSegment(BOTTOM_LEFT_2,MIDDLE_MIDDLE_8,SEG_14),
		new TileSegment(BOTTOM_LEFT_2,TOP_RIGHT_6,SEG_14|SEG_15),	
		new TileSegment(MIDDLE_MIDDLE_8,TOP_RIGHT_6,SEG_15),	

		new TileSegment(BOTTOM_MIDDLE_3,MIDDLE_RIGHT_5,SEG_16),
		
		
		//Inside slopes 45 \
		new TileSegment(MIDDLE_LEFT_1,BOTTOM_MIDDLE_3,SEG_18),
		
		new TileSegment(TOP_LEFT_0,MIDDLE_MIDDLE_8,SEG_17),
		new TileSegment(TOP_LEFT_0,BOTTOM_RIGHT_4,SEG_17|SEG_20),	
		new TileSegment(MIDDLE_MIDDLE_8,BOTTOM_RIGHT_4,SEG_20),	

		new TileSegment(MIDDLE_RIGHT_5,TOP_MIDDLE_7,SEG_19),
		

		//Inside slopes 66
		new TileSegment(BOTTOM_LEFT_2,TOP_MIDDLE_7,SEG_21),
		new TileSegment(BOTTOM_MIDDLE_3,TOP_RIGHT_6,SEG_22),
		new TileSegment(BOTTOM_MIDDLE_3,TOP_LEFT_0,SEG_23),	
		new TileSegment(BOTTOM_RIGHT_4,TOP_MIDDLE_7,SEG_24),
		
		//Inside slopes 22
		new TileSegment(MIDDLE_LEFT_1,TOP_RIGHT_6,SEG_25),
		new TileSegment(BOTTOM_LEFT_2,MIDDLE_RIGHT_5,SEG_26),
		new TileSegment(MIDDLE_RIGHT_5,TOP_LEFT_0,SEG_27),	
		new TileSegment(BOTTOM_RIGHT_4,MIDDLE_LEFT_1,SEG_28)
		
	];
			
	public var edges : Int;
	public var edgeUp : Int;
	
	public var size : Float;
	public var modifier : Int;
		
	/*
	 * External Linking Edge data
	 * 
	 *    *-128--*--64--*
	 *    |      |      |
	 *    1      |     32
	 *    |      |      |
	 *    *------*------*
	 *    |      |      |
	 *    2      |     16
	 *    |      |      |
	 *    *--4---*--8---*
	 * 
	 */
	
	public function new(size : Float, originalVertMask : Array<Int> , tileID : Int, modifier : Int) {
		this.modifier = modifier;
		this.size = size;
		this.originalVertMask = originalVertMask;
		GetScaledVerts();
		super(scaledVerts, new Vector2D());
		this.tileWidth = size;
		this.tileID = tileID;
		if (modifier&0x04>0) //Vert
			this.tileID = (1 << 31) | this.tileID;
		if (modifier&0x02>0) //Horiz
			this.tileID = (1 << 30) | this.tileID;
		if (modifier&0x01>0) //Diag
			this.tileID = (1 << 29) | this.tileID;
	}

	public function GetScaledVerts() : Void {		
		var vertMask:Array<Int> = originalVertMask;
		
		for (i in 0...modifier) {
			vertMask = rotateClockwise(vertMask);
		}
		
		unscaledVerts = new Array<Vector2D>();

		for (i in 0...vertMask.length) {
			if (vertMask[i]==1) unscaledVerts.push(VERTS[i].clone());
		}
		
		// if (vertMask[0]==1) unscaledVerts.push(VERTS[0].clone());
		// if (vertMask[1]==1) unscaledVerts.push(VERTS[1].clone());
		// if (vertMask[2]==1) unscaledVerts.push(VERTS[2].clone());
		// if (vertMask[3]==1) unscaledVerts.push(VERTS[3].clone());
		// if (vertMask[4]==1) unscaledVerts.push(VERTS[4].clone());
		// if (vertMask[5]==1) unscaledVerts.push(VERTS[5].clone());
		// if (vertMask[6]==1) unscaledVerts.push(VERTS[6].clone());
		// if (vertMask[7]==1) unscaledVerts.push(VERTS[7].clone());
		
		var numVerts:Int = unscaledVerts.length;
		//trace(getQualifiedClassName(this));
		for (i in 0...numVerts) {
		//for (var i : Int = 0; i < numVerts; i++) {
			
			var v0:Vector2D = unscaledVerts[i];
			var v1:Vector2D = unscaledVerts[(i + 1) % numVerts];
			//trace("Checking ",v0,v1);
			var n:Vector2D = v1.minus(v0).rightHandNormal().unit();
			for  (segment in VERT_TO_SEG_DEF) {
			//for each (var segment : TileSegment in VERT_TO_SEG_DEF) {
				var mask:Int = segment.CheckVertexPairAndApplyMask(v0, v1);
				if (mask>0) {
					//trace(v0,v1,n);
					edges |= mask;
					if ((n.y<0)||(n.x==-1&&n.y==0)) {
						edgeUp |= mask;
					}
					break;
				}	
			}
		}
		
		edgeT = edges & SEG_7 > 0 && edges & SEG_8 > 0 ? EDGE_STATE_FULL : EDGE_STATE_INTERESTING;
		edgeR = edges & SEG_5 > 0 && edges & SEG_6 > 0 ? EDGE_STATE_FULL : EDGE_STATE_INTERESTING;
		edgeB = edges & SEG_3 > 0 && edges & SEG_4 > 0 ? EDGE_STATE_FULL : EDGE_STATE_INTERESTING;
		edgeL = edges & SEG_1 > 0 && edges & SEG_2 > 0 ? EDGE_STATE_FULL : EDGE_STATE_INTERESTING;
		
		//trace("finished=",edges,edgeUp);
		//Scale them now...
		scaledVerts = new Array();
		//for each ( var v : Vector2D in unscaledVerts) {
		for (v in unscaledVerts) {
			scaledVerts.push(v.mult(size));
		}
	}
	
	public function CheckVertexPair(v0:Vector2D,v1:Vector2D,c0:Vector2D,c1:Vector2D):Bool {
		return ( ( v0.isEquals(c0) && v1.isEquals(c1) ) || ( v0.isEquals(c1) && v1.isEquals(c0) ) );
	}
	
	/*

	076
	185
	234
	
	*/

	public function rotateClockwise(verts:Array<Int>):Array<Int> {
		var result:Array<Int> = [];
		result[0] = verts[6];
		result[1] = verts[7];
		result[2] = verts[0];

		result[3] = verts[1];
		result[4] = verts[2];
		
		result[5] = verts[3];
		result[6] = verts[4];

		result[7] = verts[5];

		result[8] = verts[8];		

		return result;
	}

	public static function IsCollidable(data:Int) : Bool {
		return true;
	}
	
}