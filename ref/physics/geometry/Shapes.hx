package physics.geometry;

/**
 * ...
 * @author rje
 */

class Shapes 
{
	public static inline var AXIS_ALIGNED_BOX_SHAPE : Int = 0;
	public static inline var CIRCLE_SHAPE : Int = 1;
	public static inline var SEGMENT_SHAPE : Int = 2;
	public static inline var POLYGON_SHAPE : Int = 4;
	public static inline var POLYGON_POLYGON : Int = POLYGON_SHAPE | POLYGON_SHAPE;
	public static inline var CIRCLE_POLYGON : Int = CIRCLE_SHAPE | POLYGON_SHAPE;
	public static inline var CIRCLE_CIRCLE : Int = CIRCLE_SHAPE | CIRCLE_SHAPE;
	public static inline var CIRCLE_SEGMENT : Int = CIRCLE_SHAPE | SEGMENT_SHAPE;
	public static inline var SEGMENT_POLYGON : Int = SEGMENT_SHAPE | POLYGON_SHAPE;
}