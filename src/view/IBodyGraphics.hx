package physics.view;

/**
 * ...
 * @author rje
 */

interface IBodyGraphics 
{

	function Draw():Void;
	function Update(stamp:Int, x:Float, y:Float):Void;
	
	var isDisplayed(default, default):Bool;
	var renderTimeStamp(default, default):Int;
	
}