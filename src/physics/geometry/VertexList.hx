package physics.geometry;

/**
 * ...
 * @author rje
 */

class VertexList 
{

	public var vertices : Array<Vector2D>;
	public var transformedVertices : Array<Vector2D>;
	
	public function new() 
	{
		vertices = new Array<Vector2D>();
		transformedVertices = new Array<Vector2D>();
	}
	
	public function AddVertex(v:Vector2D):Vector2D {
		vertices.push(v);
		var tV = v.clone();
		transformedVertices.push(tV);
		return tV;
	}
	
	public function RemoveVertex(v:Vector2D):Void {
		for (i in 0...transformedVertices.length) {
			if (transformedVertices[i] == v) {
				vertices.splice(i, 1);
				transformedVertices.splice(i, 1);
				return;
			}
		}
	}
	
	public function Update( rotation : Vector2D , flipVerticaly:Bool) : Void {
		var vertexCount = vertices.length;
		for (i in 0...vertexCount) {
			var v = vertices[i];
			var tv = transformedVertices[i];
			tv.x = (v.x * rotation.x - v.y * rotation.y);
			tv.y = (v.x * rotation.y + v.y * rotation.x);
			
			if (flipVerticaly) {
				tv.x *= -1;
				tv.y *= -1;
			}
		}		
	}
	
}